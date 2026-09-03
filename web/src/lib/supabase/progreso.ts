/**
 * Funciones de acceso a Supabase para progreso, checklist y gates.
 * Usadas desde componentes "use client" via el browser client.
 */
import { createClient } from "./client";

// ── Tipos ──────────────────────────────────────────────────────────────────

export type EstadoModulo =
  | "bloqueado"
  | "disponible"
  | "en_curso"
  | "evaluacion"
  | "aprobado"
  | "reprobado";

export interface ModuloEstado {
  estado: EstadoModulo;
  calificacion: number | null;
  fecha_inicio: string | null;
  fecha_aprobacion: string | null;
  intentos_evaluacion: number;
}

export interface ChecklistItem {
  item_key: string;
  item_type: "programa" | "biblio" | "evidencia";
  checked: boolean;
}

// ── Expediente completo ────────────────────────────────────────────────────

export async function getExpediente() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("modulo_estado")
    .select("modulo_id, estado, calificacion, fecha_inicio, fecha_aprobacion, intentos_evaluacion")
    .order("modulo_id");
  if (error) throw error;
  return data ?? [];
}

// ── Estado de un módulo ────────────────────────────────────────────────────

export async function getModuloEstado(moduloId: string): Promise<ModuloEstado | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("modulo_estado")
    .select("estado, calificacion, fecha_inicio, fecha_aprobacion, intentos_evaluacion")
    .eq("modulo_id", moduloId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function setModuloEstado(
  moduloId: string,
  estado: EstadoModulo,
  extra?: Partial<Omit<ModuloEstado, "estado">>
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const updates: Record<string, unknown> = { estado, updated_at: new Date().toISOString(), ...extra };
  if (estado === "en_curso" && !extra?.fecha_inicio) {
    updates.fecha_inicio = new Date().toISOString();
  }

  const { error } = await supabase
    .from("modulo_estado")
    .upsert({ user_id: user.id, modulo_id: moduloId, ...updates },
             { onConflict: "user_id,modulo_id" });
  if (error) throw error;
}

// ── Checklist ──────────────────────────────────────────────────────────────

export async function getChecklist(moduloId: string): Promise<ChecklistItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("checklist_items")
    .select("item_key, item_type, checked")
    .eq("modulo_id", moduloId);
  if (error) throw error;
  return data ?? [];
}

export async function setChecklistItem(
  moduloId: string,
  itemKey: string,
  itemType: ChecklistItem["item_type"],
  checked: boolean
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const { error } = await supabase
    .from("checklist_items")
    .upsert(
      { user_id: user.id, modulo_id: moduloId, item_key: itemKey, item_type: itemType, checked, updated_at: new Date().toISOString() },
      { onConflict: "user_id,modulo_id,item_key" }
    );
  if (error) throw error;
}

// ── Artefactos ─────────────────────────────────────────────────────────────

export async function getArtefactos(moduloId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("artefactos")
    .select("id, nombre, tipo, contenido, created_at")
    .eq("modulo_id", moduloId)
    .order("created_at");
  if (error) throw error;
  return data ?? [];
}

export async function addArtefacto(
  moduloId: string,
  nombre: string,
  tipo: string,
  contenido: string
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const { error } = await supabase
    .from("artefactos")
    .insert({ user_id: user.id, modulo_id: moduloId, nombre, tipo, contenido });
  if (error) throw error;
}

// ── Gate: ¿puede evaluar? ─────────────────────────────────────────────────

export interface GateStatus {
  programaPct: number;        // 0–100
  biblioCompleta: boolean;
  tieneArtefacto: boolean;
  puedeEvaluar: boolean;      // los tres gates OK
}

// ── Registrar aprobación y desbloquear dependientes ────────────────────────

export async function registrarAprobacion(
  moduloId: string,
  calificacion: number
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  // 1. Actualizar estado del módulo
  await setModuloEstado(moduloId, "aprobado", {
    calificacion,
    fecha_aprobacion: new Date().toISOString(),
  });

  // 2. Llamar función RPC que desbloquea dependientes
  const { error } = await supabase.rpc("desbloquear_dependientes", {
    p_user_id: user.id,
    p_modulo_aprobado: moduloId,
  });
  if (error) throw error;
}

// ── Gate: ¿puede evaluar? ─────────────────────────────────────────────────

export async function calcularGate(moduloId: string, totalUnidades = 8): Promise<GateStatus> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { programaPct: 0, biblioCompleta: false, tieneArtefacto: false, puedeEvaluar: false };

  const [checklist, artefactos] = await Promise.all([
    getChecklist(moduloId),
    getArtefactos(moduloId),
  ]);

  const programa = checklist.filter(i => i.item_type === "programa" && i.checked);
  const biblio = checklist.filter(i => i.item_type === "biblio");
  const biblioChecked = checklist.filter(i => i.item_type === "biblio" && i.checked);

  const programaPct = Math.round((programa.length / totalUnidades) * 100);
  const biblioCompleta = biblio.length > 0 && biblio.length === biblioChecked.length;
  const tieneArtefacto = artefactos.length > 0;
  const puedeEvaluar = programaPct >= 90 && biblioCompleta && tieneArtefacto;

  return { programaPct, biblioCompleta, tieneArtefacto, puedeEvaluar };
}
