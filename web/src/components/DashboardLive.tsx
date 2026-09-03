"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { watchAuth } from "@/lib/supabase/client";
import { getExpediente, type EstadoModulo } from "@/lib/supabase/progreso";
import { getEstadoModulo, plan } from "@/lib/data";
import { ModuleCard } from "./ModuleCard";
import { ProgressRing } from "./ProgressRing";
import { StatusBadge } from "./StatusBadge";

interface ModuloRow {
  modulo_id: string;
  estado: EstadoModulo;
  calificacion: number | null;
  fecha_inicio: string | null;
  fecha_aprobacion: string | null;
  intentos_evaluacion: number;
}

export function DashboardLive() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [rows, setRows] = useState<ModuloRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return watchAuth((next) => setUser(next ? { email: next.email } : null));
  }, []);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    getExpediente()
      .then(setRows)
      .finally(() => setLoading(false));
  }, [user]);

  // Merge datos vivos con plan estático
  function getEstado(id: string): EstadoModulo {
    const row = rows.find(r => r.modulo_id === id);
    if (row) return row.estado;
    return getEstadoModulo(id) as EstadoModulo;
  }

  const aprobados = rows.filter(r => r.estado === "aprobado").length;
  const total = plan.modulos.length;
  const anio1 = plan.modulos.filter(m => m.anio === 1);

  // Módulo activo: en_curso o disponible
  const actual = plan.modulos.find(m => {
    const e = getEstado(m.id);
    return e === "en_curso";
  }) ?? plan.modulos.find(m => {
    const e = getEstado(m.id);
    return e === "disponible" || e === "evaluacion";
  });

  return (
    <>
      {/* Resumen */}
      <section className="mb-10 flex flex-wrap items-center justify-around gap-8 rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <ProgressRing
          value={aprobados}
          total={total}
          label="Progreso global"
        />
        <div className="space-y-3 text-sm">
          {user?.email && (
            <div>
              <p className="text-stone-500">Sesión</p>
              <p className="truncate font-medium">{user.email}</p>
            </div>
          )}
          <div>
            <p className="text-stone-500">Aprobados</p>
            <p className="font-medium tabular-nums">
              {loading ? "…" : `${aprobados} / ${total}`}
            </p>
          </div>
        </div>
      </section>

      {/* Módulo activo */}
      {actual && (
        <section className="mb-10">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-stone-500">
            {getEstado(actual.id) === "en_curso" ? "En curso" : "Próximo disponible"}
          </h2>
          <div className="rounded-2xl border border-stone-300 bg-stone-50 p-5 dark:border-stone-700 dark:bg-stone-900/50">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm text-stone-500">{actual.id}</span>
              <StatusBadge estado={getEstado(actual.id)} />
            </div>
            <h3 className="mb-2 text-lg font-medium">{actual.nombre}</h3>
            <p className="mb-4 text-sm text-stone-600 dark:text-stone-400">
              {plan.tracks[actual.track as keyof typeof plan.tracks] ?? actual.track} · {actual.nivel}
            </p>
            <Link
              href={`/modulo/${actual.id.toLowerCase()}`}
              className="inline-flex rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
            >
              Abrir módulo
            </Link>
          </div>
        </section>
      )}

      {/* Año 1 */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wide text-stone-500">
            Año 1 — Fundamentos
          </h2>
          <Link
            href="/plan"
            className="text-sm text-stone-600 underline-offset-2 hover:underline dark:text-stone-400"
          >
            Ver plan completo
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {anio1.map(m => (
            <ModuleCard
              key={m.id}
              modulo={m}
              estadoOverride={loading ? undefined : getEstado(m.id)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
