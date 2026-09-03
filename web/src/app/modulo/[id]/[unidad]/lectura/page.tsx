import { notFound } from "next/navigation";
import { ReadingClient } from "@/components/ReadingClient";
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

export default async function LecturaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; unidad: string }>;
  searchParams: Promise<{ url?: string; title?: string }>;
}) {
  const { id: slug, unidad: unidadSlug } = await params;
  const q = await searchParams;
  const moduloId = idFromSlug(slug);
  const modulo = getModulo(moduloId);
  if (!modulo) notFound();

  const match = unidadSlug.match(/^u(\d+)$/i);
  if (!match) notFound();
  const doc = loadModuloDoc(moduloId);
  const unidad = doc?.unidades.find((u) => u.num === Number(match[1]));
  if (!unidad) notFound();

  const url = q.url ? decodeURIComponent(q.url) : "";
  if (!url || !/^https?:\/\//i.test(url)) notFound();

  const title = q.title ? decodeURIComponent(q.title) : "Lectura";

  return (
    <ReadingClient
      moduloId={moduloId}
      unidadSlug={unidad.slug}
      unidadLabel={unidad.id}
      url={url}
      title={title}
    />
  );
}
