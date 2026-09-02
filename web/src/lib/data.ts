import planData from "@/data/plan_general.json";
import progresoData from "@/data/progreso.json";
import type { ModuloPlan, PlanGeneral, ProgresoExpediente } from "@/types";

export const plan = planData as PlanGeneral;
export const progreso = progresoData as ProgresoExpediente;

export function getModulo(id: string): ModuloPlan | undefined {
  return plan.modulos.find((m) => m.id === id);
}

export function getModulosPorAnio(anio: number): ModuloPlan[] {
  return plan.modulos.filter((m) => m.anio === anio);
}

export function getTrackLabel(track: string): string {
  const parts = track.split("-");
  return parts.map((p) => plan.tracks[p] ?? p).join(" · ");
}

export function getEstadoModulo(id: string): string {
  return progreso.modulos[id]?.estado ?? "bloqueado";
}

export function getModuloActual(): ModuloPlan | undefined {
  const activo = progreso.expediente.modulo_actual;
  if (activo) return getModulo(activo);

  const enCurso = plan.modulos.find(
    (m) => progreso.modulos[m.id]?.estado === "en_curso",
  );
  if (enCurso) return enCurso;

  const disponible = plan.modulos.find(
    (m) => progreso.modulos[m.id]?.estado === "disponible",
  );
  return disponible;
}

export function slugFromId(id: string): string {
  return id.toLowerCase();
}

export function idFromSlug(slug: string): string {
  return slug.toUpperCase();
}
