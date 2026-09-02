import { readFileSync, existsSync } from "fs";
import { join } from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { StatusBadge } from "@/components/StatusBadge";
import {
  getModulo,
  getTrackLabel,
  idFromSlug,
  plan,
  progreso,
} from "@/lib/data";

export function generateStaticParams() {
  return plan.modulos.map((m) => ({ id: m.id.toLowerCase() }));
}

function loadMarkdown(moduloId: string): string | null {
  const path = join(process.cwd(), "content", "modulos", `${moduloId}.md`);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf-8");
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
  const horasPlataforma = progreso.modulos[moduloId]?.horas_plataforma ?? 0;
  const markdown = loadMarkdown(moduloId);

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
          {getTrackLabel(modulo.track)} · {modulo.nivel} · ~
          {modulo.horas} h orientativas
        </p>
        {horasPlataforma > 0 && (
          <p className="mt-2 text-xs text-stone-400">
            {horasPlataforma} h registradas en plataforma (estadística)
          </p>
        )}
      </header>

      <section className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-stone-200 p-4 dark:border-stone-800">
          <h2 className="mb-2 text-xs font-medium uppercase text-stone-500">
            Prerrequisitos
          </h2>
          <p className="text-sm">
            {modulo.prerrequisitos.length
              ? modulo.prerrequisitos.join(", ")
              : "Ninguno"}
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

      {markdown ? (
        <article className="prose prose-stone max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-stone-800 dark:prose-a:text-stone-200">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      ) : (
        <div className="rounded-xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-700">
          <p className="text-sm text-stone-500">
            Programa detallado pendiente de publicación para {modulo.id}.
          </p>
          <p className="mt-2 text-xs text-stone-400">
            Los metadatos del plan ya están disponibles arriba.
          </p>
        </div>
      )}

      <footer className="mt-10 rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600 dark:border-stone-800 dark:bg-stone-900/40 dark:text-stone-400">
        <p className="font-medium text-stone-800 dark:text-stone-200">
          Gate para evaluar (ritmo libre)
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
          <li>Programa ≥ 90% cubierto</li>
          <li>Bibliografía obligatoria leída</li>
          <li>≥ 1 artefacto de estudio</li>
          <li>Evaluación aprobada (≥ 70%)</li>
        </ul>
        <p className="mt-3 text-xs text-stone-400">
          Fase 2: checklist interactivo, artefactos y evaluación en la plataforma.
        </p>
      </footer>
    </div>
  );
}
