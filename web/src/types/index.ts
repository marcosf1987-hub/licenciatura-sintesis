export type ModuloEstado =
  | "bloqueado"
  | "disponible"
  | "en_curso"
  | "evaluacion"
  | "aprobado"
  | "reprobado";

export interface ModuloPlan {
  id: string;
  nombre: string;
  anio: number;
  orden: number;
  track: string;
  nivel: string;
  horas: number;
  prerrequisitos: string[];
  desbloquea: string[];
  familias: number[];
  carreras_ref: string[];
  notas?: string;
}

export interface ModuloProgreso {
  estado: ModuloEstado;
  horas_plataforma: number;
  calificacion: number | null;
  fecha_inicio: string | null;
  fecha_aprobacion: string | null;
  intentos_evaluacion: number;
}

export interface PlanGeneral {
  programa: {
    nombre: string;
    version: string;
    duracion_anios: number;
    modulos_totales: number;
    horas_por_modulo: number;
    horas_anuales: number;
    horas_totales: number;
    diagnostico_ramas: number;
    familias: number;
    fecha_cierre_plan: string;
  };
  tracks: Record<string, string>;
  modulos: ModuloPlan[];
}

export interface ProgresoExpediente {
  expediente: {
    titular: string;
    programa: string;
    version_plan: string;
    fecha_inicio: string | null;
    fecha_actualizacion: string;
    modulo_actual: string | null;
    modulos_aprobados: number;
    modulos_totales: number;
    horas_plataforma_total: number;
    horas_orientativas_plan: number;
    promedio_general: number | null;
  };
  modulos: Record<string, ModuloProgreso>;
  cobertura_carreras: Record<
    string,
    { porcentaje: number; objetivo: string }
  >;
}
