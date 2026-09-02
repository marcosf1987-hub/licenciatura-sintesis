import Link from "next/link";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressRing } from "@/components/ProgressRing";
import { StatusBadge } from "@/components/StatusBadge";
import {
  getModuloActual,
  getModulosPorAnio,
  getTrackLabel,
  plan,
  progreso,
} from "@/lib/data";

export default function HomePage() {
  const { expediente } = progreso;
  const actual = getModuloActual();
  const anio1 = getModulosPorAnio(1);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <section className="mb-10">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          {plan.programa.nombre}
        </h1>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          Comprender las estructuras profundas que sostienen lo visible, y
          explorar las zonas liminales donde producen mito o lo anómalo.
        </p>
      </section>

      <section className="mb-10 flex flex-wrap items-center justify-around gap-8 rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <ProgressRing
          value={expediente.modulos_aprobados}
          total={expediente.modulos_totales}
          label="Progreso global"
        />
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-stone-500">Titular</p>
            <p className="font-medium">{expediente.titular}</p>
          </div>
          <div>
            <p className="text-stone-500">Horas en plataforma</p>
            <p className="font-medium tabular-nums">
              {expediente.horas_plataforma_total}{" "}
              <span className="font-normal text-stone-400">(solo stats)</span>
            </p>
          </div>
          <div>
            <p className="text-stone-500">Referencia orientativa</p>
            <p className="font-medium tabular-nums">
              ~{expediente.horas_orientativas_plan} h
            </p>
          </div>
        </div>
      </section>

      {actual && (
        <section className="mb-10">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-stone-500">
            Próximo módulo
          </h2>
          <div className="rounded-2xl border border-stone-300 bg-stone-50 p-5 dark:border-stone-700 dark:bg-stone-900/50">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-sm text-stone-500">
                {actual.id}
              </span>
              <StatusBadge estado={progreso.modulos[actual.id]?.estado ?? "disponible"} />
            </div>
            <h3 className="mb-2 text-lg font-medium">{actual.nombre}</h3>
            <p className="mb-4 text-sm text-stone-600 dark:text-stone-400">
              {getTrackLabel(actual.track)} · {actual.nivel}
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
          {anio1.map((m) => (
            <ModuleCard key={m.id} modulo={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
