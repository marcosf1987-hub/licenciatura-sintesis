/**
 * Funciones de acceso a Supabase para progreso, checklist y gates.
 * Usadas desde componentes "use client" via el browser client.
 */
import { createClient } from "./client";

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

export interface GateStatus {
  programaPct: number;
  biblioCompleta: boolean;
  tieneArtefacto: boolean;
  puedeEvaluar: boolean;
}

export async function getExpediente() {
  const supabase = createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("modulo_estado")
    .select("modulo_id, estado, calificacion, fecha_inicio, fecha_aprobacion, intentos_evaluacion")
    .order("modulo_id");
  if (error) throw error;
  return data ?? [];
}

export async function getModuloEstado(moduloId: string): Promise<ModuloEstado | null> {
  const supabase = createClient();
  if (!supabase) return null;
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
  if (!supabase) throw new Error("Supabase no disponible");
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

export async function getChecklist(moduloId: string): Promise<ChecklistItem[]> {
  const supabase = createClient();
  if (!supabase) return [];
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
  if (!supabase) throw new Error("Supabase no disponible");
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

export type ArtefactoTipo = "nota" | "mapa" | "ejercicios" | "ensayo" | "otro";

export interface Artefacto {
  id: string;
  nombre: string;
  tipo: ArtefactoTipo;
  contenido: string | null;
  created_at: string;
}

export async function getArtefactos(moduloId: string): Promise<Artefacto[]> {
  const supabase = createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("artefactos")
    .select("id, nombre, tipo, contenido, created_at")
    .eq("modulo_id", moduloId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Artefacto[];
}

export async function addArtefacto(
  moduloId: string,
  nombre: string,
  tipo: ArtefactoTipo,
  contenido: string
): Promise<Artefacto> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase no disponible");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const { data, error } = await supabase
    .from("artefactos")
    .insert({
      user_id: user.id,
      modulo_id: moduloId,
      nombre: nombre.trim(),
      tipo,
      contenido: contenido.trim() || null,
    })
    .select("id, nombre, tipo, contenido, created_at")
    .single();
  if (error) throw error;
  return data as Artefacto;
}

export async function deleteArtefacto(id: string) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase no disponible");
  const { error } = await supabase.from("artefactos").delete().eq("id", id);
  if (error) throw error;
}

export async function registrarAprobacion(
  moduloId: string,
  calificacion: number
) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase no disponible");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  await setModuloEstado(moduloId, "aprobado", {
    calificacion,
    fecha_aprobacion: new Date().toISOString(),
  });

  const { error } = await supabase.rpc("desbloquear_dependientes", {
    p_user_id: user.id,
    p_modulo_aprobado: moduloId,
  });
  if (error) throw error;
}

export async function calcularGate(moduloId: string, totalUnidades = 8): Promise<GateStatus> {
  const supabase = createClient();
  if (!supabase) {
    return { programaPct: 0, biblioCompleta: false, tieneArtefacto: false, puedeEvaluar: false };
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { programaPct: 0, biblioCompleta: false, tieneArtefacto: false, puedeEvaluar: false };

  const [checklist, artefactos] = await Promise.all([
    getChecklist(moduloId),
    getArtefactos(moduloId),
  ]);

  const programa = checklist.filter((i) => i.item_type === "programa" && i.checked);
  const biblioChecked = checklist.filter((i) => i.item_type === "biblio" && i.checked);

  const programaPct = Math.round((programa.length / totalUnidades) * 100);
  const biblioCompleta = biblioChecked.length >= Math.ceil(totalUnidades * 0.9);
  const tieneArtefacto = artefactos.length > 0;
  const puedeEvaluar = programaPct >= 90 && biblioCompleta && tieneArtefacto;

  return { programaPct, biblioCompleta, tieneArtefacto, puedeEvaluar };
}

// ── Sesiones / tiempo en plataforma (solo stats) ───────────────────────────

export type SessionKind = "webapp" | "lectura" | "unidad";

export async function startSession(input: {
  moduloId: string;
  unidadId?: string;
  url?: string;
  kind?: SessionKind;
}): Promise<string | null> {
  const supabase = createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("session_events")
    .insert({
      user_id: user.id,
      modulo_id: input.moduloId,
      unidad_id: input.unidadId ?? null,
      url: input.url ?? null,
      kind: input.kind ?? "webapp",
      started_at: new Date().toISOString(),
    })
    .select("id")
    .single();
  if (error) {
    console.error("startSession", error);
    return null;
  }
  return data.id as string;
}

export async function endSession(sessionId: string, durationSeconds: number) {
  const supabase = createClient();
  if (!supabase || !sessionId) return;
  const { error } = await supabase
    .from("session_events")
    .update({
      ended_at: new Date().toISOString(),
      duration_seconds: Math.max(0, Math.round(durationSeconds)),
    })
    .eq("id", sessionId);
  if (error) console.error("endSession", error);
}

/** Segundos totales acumulados en session_events (solo stats). */
export async function getSegundosPlataformaTotal(): Promise<number> {
  const supabase = createClient();
  if (!supabase) return 0;
  const { data, error } = await supabase
    .from("session_events")
    .select("duration_seconds")
    .not("duration_seconds", "is", null);
  if (error) return 0;
  return (data ?? []).reduce(
    (acc: number, row: { duration_seconds: number | null }) =>
      acc + (row.duration_seconds ?? 0),
    0
  );
}

/** @deprecated preferí getSegundosPlataformaTotal + formatTiempoPlataforma */
export async function getHorasPlataformaTotal(): Promise<number> {
  const secs = await getSegundosPlataformaTotal();
  return Math.round((secs / 3600) * 10) / 10;
}

export function formatTiempoPlataforma(totalSeconds: number): string {
  return formatMinutosEstudio(Math.floor(totalSeconds / 60));
}

/** Formatea minutos totales de estudio (métrica principal). */
export function formatMinutosEstudio(totalMinutes: number): string {
  const m = Math.max(0, Math.floor(totalMinutes));
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (r === 0) return `${h} h`;
  return `${h} h ${r} min`;
}

// ── Estudio declarado por unidad (métrica principal) ───────────────────────

export interface EstudioUnidad {
  modulo_id: string;
  unidad_id: string;
  minutos: number;
  updated_at: string;
}

export async function upsertEstudioUnidad(
  moduloId: string,
  unidadId: string,
  minutos: number
): Promise<void> {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase no disponible");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const mins = Math.max(0, Math.min(10080, Math.round(minutos)));
  const { error } = await supabase.from("estudio_unidad").upsert(
    {
      user_id: user.id,
      modulo_id: moduloId,
      unidad_id: unidadId,
      minutos: mins,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,modulo_id,unidad_id" }
  );
  if (error) throw error;
}

export async function getEstudioUnidad(
  moduloId: string,
  unidadId: string
): Promise<number | null> {
  const supabase = createClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("estudio_unidad")
    .select("minutos")
    .eq("modulo_id", moduloId)
    .eq("unidad_id", unidadId)
    .maybeSingle();
  if (error || !data) return null;
  return data.minutos as number;
}

export async function getMinutosEstudioTotal(): Promise<number> {
  const supabase = createClient();
  if (!supabase) return 0;
  const { data, error } = await supabase
    .from("estudio_unidad")
    .select("minutos");
  if (error) return 0;
  return (data ?? []).reduce(
    (acc: number, row: { minutos: number | null }) => acc + (row.minutos ?? 0),
    0
  );
}

export async function getMinutosEstudioModulo(moduloId: string): Promise<number> {
  const supabase = createClient();
  if (!supabase) return 0;
  const { data, error } = await supabase
    .from("estudio_unidad")
    .select("minutos")
    .eq("modulo_id", moduloId);
  if (error) return 0;
  return (data ?? []).reduce(
    (acc: number, row: { minutos: number | null }) => acc + (row.minutos ?? 0),
    0
  );
}

