import Link from "next/link";
import { notFound } from "next/navigation";
import { UnidadBody } from "@/components/ModuloFlow";
import { ProgresoProvider } from "@/components/progreso";
import { getModulo, idFromSlug, plan } from "@/lib/data";
import { loadModuloDoc } from "@/lib/load-modulo";

export function generateStaticParams() {
  const params: { id: string; unidad: string }[] = [];
  for (const m of plan.modulos) {
    const doc = loadModuloDoc(m.id);
    if (!doc) continue;
    for (const u of doc.unidades) {
      params.push({ id: m.id.toLowerCase(), unidad: u.slug });
    }
  }
  return params;
}

export default async function UnidadPage({
  params,
}: {
  params: Promise<{ id: string; unidad: string }>;
}) {
  const { id: slug, unidad: unidadSlug } = await params;
  const moduloId = idFromSlug(slug);
  const modulo = getModulo(moduloId);
  if (!modulo) notFound();

  const match = unidadSlug.match(/^u(\d+)$/i);
  if (!match) notFound();
  const num = Number(match[1]);

  const doc = loadModuloDoc(moduloId);
  const unidad = doc?.unidades.find((u) => u.num === num);
  if (!unidad) notFound();

  const idx = doc!.unidades.findIndex((u) => u.num === num);
  const anterior = idx > 0 ? doc!.unidades[idx - 1] : null;
  const siguiente = idx >= 0 && idx < doc!.unidades.length - 1 ? doc!.unidades[idx + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href={`/modulo/${slug}`}
        className="mb-6 inline-block text-sm text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
      >
        ← {modulo.id} · {modulo.nombre}
      </Link>
      <p className="mb-2 font-mono text-xs text-stone-500">
        {unidad.id} de {doc!.unidades.length}
      </p>
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">{unidad.title}</h1>
      <ProgresoProvider moduloId={moduloId} totalUnidades={doc!.unidades.length}>
        <UnidadBody
          moduloId={moduloId}
          unidad={unidad}
          siguiente={siguiente}
          anterior={anterior}
          unidades={doc!.unidades}
        />
      </ProgresoProvider>
    </div>
  );
}
