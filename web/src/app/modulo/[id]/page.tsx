import Link from "next/link";
import { notFound } from "next/navigation";
import { ModuloIntroBody } from "@/components/ModuloFlow";
import { ProgresoProvider } from "@/components/progreso";
import { StatusBadge } from "@/components/StatusBadge";
import { getModulo, getTrackLabel, idFromSlug, plan, progreso } from "@/lib/data";
import { loadModuloDoc } from "@/lib/load-modulo";

export function generateStaticParams() {
  return plan.modulos.map((m) => ({ id: m.id.toLowerCase() }));
}

export default async function ModuloPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;
  const moduloId = idFromSlug(slug);
  const modulo = getModulo(moduloId);
  if (!modulo) notFound();

  const estado = progreso.modulos[moduloId]?.estado ?? "bloqueado";
  const doc = loadModuloDoc(moduloId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/plan"
        className="mb-6 inline-block text-sm text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
      >
        ← Plan de estudios
      </Link>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-sm text-stone-500">{modulo.id}</span>
          <StatusBadge estado={estado} />
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs dark:bg-stone-800">
            Año {modulo.anio}
          </span>
        </div>
        <h1 className="mb-3 text-2xl font-semibold leading-tight tracking-tight">
          {modulo.nombre}
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          {getTrackLabel(modulo.track)} · nivel {modulo.nivel.replace("-", " → ")}
        </p>
      </header>

      <section className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-stone-200 p-4 dark:border-stone-800">
          <h2 className="mb-2 text-xs font-medium uppercase text-stone-500">
            Prerrequisitos
          </h2>
          <p className="text-sm">
            {modulo.prerrequisitos.length ? modulo.prerrequisitos.join(", ") : "Ninguno"}
          </p>
        </div>
        <div className="rounded-xl border border-stone-200 p-4 dark:border-stone-800">
          <h2 className="mb-2 text-xs font-medium uppercase text-stone-500">
            Desbloquea
          </h2>
          <p className="text-sm">
            {modulo.desbloquea.length ? modulo.desbloquea.join(", ") : "—"}
          </p>
        </div>
      </section>

      {modulo.carreras_ref?.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-2 text-xs font-medium uppercase text-stone-500">
            Carreras de referencia
          </h2>
          <div className="flex flex-wrap gap-2">
            {modulo.carreras_ref.map((c) => (
              <span
                key={c}
                className="rounded-full bg-stone-100 px-2.5 py-1 text-xs dark:bg-stone-800"
              >
                {c}
              </span>
            ))}
          </div>
        </section>
      )}

      {doc ? (
        <ProgresoProvider moduloId={moduloId} totalUnidades={doc.unidades.length || 8}>
          <ModuloIntroBody
            intro={doc.intro}
            moduloId={moduloId}
            unidades={doc.unidades}
          />
        </ProgresoProvider>
      ) : (
        <div className="rounded-xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-700">
          <p className="text-sm text-stone-500">
            El programa detallado de {modulo.id} todavía no está publicado.
          </p>
        </div>
      )}
    </div>
  );
}
