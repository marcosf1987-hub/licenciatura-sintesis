import { ModuleCard } from "@/components/ModuleCard";
import { OptionalModuleCard } from "@/components/OptionalModuleCard";
import { plan } from "@/lib/data";

export default function PlanPage() {
  const anios = Array.from({ length: plan.programa.duracion_anios }, (_, i) => i + 1);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Plan de estudios</h1>
      <p className="mb-8 text-sm text-stone-600 dark:text-stone-400">
        {plan.modulos.length} módulos · {plan.programa.familias} familias ·{" "}
        {plan.programa.diagnostico_ramas} ramas diagnosticadas · ritmo libre
      </p>

      <div className="mb-10 rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900/40">
        <h2 className="mb-2 text-sm font-medium text-stone-700 dark:text-stone-300">
          Tracks
        </h2>
        <ul className="grid gap-1 text-xs text-stone-600 dark:text-stone-400 sm:grid-cols-2">
          {Object.entries(plan.tracks).map(([key, label]) => (
            <li key={key}>
              <span className="font-mono font-medium text-stone-800 dark:text-stone-200">
                {key}
              </span>{" "}
              — {label}
            </li>
          ))}
        </ul>
      </div>

      {anios.map((anio) => {
        const modulos = plan.modulos.filter((m) => m.anio === anio);
        return (
          <section key={anio} className="mb-10">
            <h2 className="mb-4 border-b border-stone-200 pb-2 text-lg font-medium dark:border-stone-800">
              Año {anio}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {modulos.map((m) => (
                <ModuleCard key={m.id} modulo={m} />
              ))}
            </div>
          </section>
        );
      })}

      {plan.modulos_opcionales_anio_8 && (
        <section className="mb-10 opacity-80">
          <h2 className="mb-4 border-b border-dashed border-stone-300 pb-2 text-lg font-medium dark:border-stone-700">
            Año 8 — Cola opcional
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {plan.modulos_opcionales_anio_8.map((m) => (
              <OptionalModuleCard key={m.id} modulo={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
