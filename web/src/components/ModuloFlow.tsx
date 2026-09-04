"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { UnidadDoc } from "@/lib/parse-modulo";
import { AuthBanner, GatePanel, MarkdownBody, useProgreso } from "./progreso";
import { ArtefactosPanel } from "./ArtefactosPanel";

export function UnidadIndex({
  moduloId,
  unidades,
}: {
  moduloId: string;
  unidades: UnidadDoc[];
}) {
  const { user, isChecked, loading } = useProgreso();
  const slug = moduloId.toLowerCase();

  const current =
    unidades.find((u, i) => {
      const prevDone = i === 0 || isChecked(unidades[i - 1].id);
      return prevDone && !isChecked(u.id);
    }) ?? unidades[unidades.length - 1];

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-lg font-medium">Unidades</h2>
      <ol className="space-y-2">
        {unidades.map((u, i) => {
          const done = isChecked(u.id);
          const unlocked = !user || i === 0 || isChecked(unidades[i - 1].id);
          const isCurrent = current?.id === u.id && !done;
          const href = `/modulo/${slug}/${u.slug}`;

          if (!unlocked) {
            return (
              <li
                key={u.id}
                className="flex items-center justify-between rounded-xl border border-stone-200 px-4 py-3 text-sm opacity-45 dark:border-stone-800"
              >
                <span>
                  <span className="font-mono text-stone-500">{u.id}</span>{" "}
                  {u.title}
                </span>
                <span className="text-xs text-stone-400">Bloqueada</span>
              </li>
            );
          }

          return (
            <li key={u.id}>
              <Link
                href={href}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
                  isCurrent
                    ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                    : done
                      ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40"
                      : "border-stone-200 hover:border-stone-400 dark:border-stone-800"
                }`}
              >
                <span>
                  <span className={`font-mono ${isCurrent ? "text-stone-300 dark:text-stone-600" : "text-stone-500"}`}>
                    {u.id}
                  </span>{" "}
                  {u.title}
                </span>
                <span className="text-xs">
                  {done ? "Hecha" : isCurrent ? "Seguir" : "Abrir"}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      {!user && !loading && (
        <p className="mt-3 text-xs text-stone-400">
          Sin sesión podés leer. Para marcar unidades y desbloquear el orden, iniciá sesión.
        </p>
      )}
    </section>
  );
}

export function CompletarUnidad({
  moduloId,
  unidad,
  siguiente,
}: {
  moduloId: string;
  unidad: UnidadDoc;
  siguiente: UnidadDoc | null;
}) {
  const router = useRouter();
  const { user, isChecked, mark } = useProgreso();
  const [busy, setBusy] = useState(false);
  const done = isChecked(unidad.id);
  const slug = moduloId.toLowerCase();

  async function handleComplete() {
    if (!user) {
      router.push("/login");
      return;
    }
    setBusy(true);
    await mark(`${unidad.id}_BIBLIO`, "biblio");
    await mark(unidad.id, "programa");
    setBusy(false);
    if (siguiente) {
      router.push(`/modulo/${slug}/${siguiente.slug}`);
    } else {
      router.push(`/modulo/${slug}/${unidad.slug}`);
    }
  }

  return (
    <div className="mt-10 rounded-xl border border-stone-200 p-5 dark:border-stone-800">
      {done ? (
        <p className="mb-3 text-sm text-emerald-700 dark:text-emerald-400">
          {unidad.id} está marcada como hecha.
        </p>
      ) : (
        <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
          Cuando termines lecturas y práctica de esta unidad:
        </p>
      )}
      <button
        type="button"
        onClick={handleComplete}
        disabled={busy}
        className="w-full rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"
      >
        {busy
          ? "Guardando…"
          : siguiente
            ? `Completar ${unidad.id} y pasar a ${siguiente.id}`
            : `Completar ${unidad.id} y volver al módulo`}
      </button>
    </div>
  );
}

export function ModuloIntroBody({
  intro,
  moduloId,
  unidades,
}: {
  intro: string;
  moduloId: string;
  unidades: UnidadDoc[];
}) {
  return (
    <>
      <AuthBanner />
      <MarkdownBody content={intro} />
      {unidades.length > 0 ? (
        <UnidadIndex moduloId={moduloId} unidades={unidades} />
      ) : null}
      <ArtefactosPanel moduloId={moduloId} />
    </>
  );
}

export function UnidadBody({
  moduloId,
  unidad,
  siguiente,
  anterior,
  unidades,
}: {
  moduloId: string;
  unidad: UnidadDoc;
  siguiente: UnidadDoc | null;
  anterior: UnidadDoc | null;
  unidades: UnidadDoc[];
}) {
  const slug = moduloId.toLowerCase();
  const { isChecked, loading, user } = useProgreso();
  const idx = unidades.findIndex((u) => u.id === unidad.id);
  const unlocked = !user || idx <= 0 || isChecked(unidades[idx - 1].id);

  if (!loading && !unlocked) {
    const prev = unidades[idx - 1];
    return (
      <div className="rounded-xl border border-stone-200 p-6 text-sm dark:border-stone-800">
        <p className="mb-3">
          Esta unidad se abre al completar {prev.id} ({prev.title}).
        </p>
        <Link
          href={`/modulo/${slug}/${prev.slug}`}
          className="font-medium text-stone-800 underline underline-offset-2 dark:text-stone-200"
        >
          Ir a {prev.id}
        </Link>
      </div>
    );
  }

  return (
    <>
      <AuthBanner />
      <MarkdownBody
        content={unidad.body}
        unidadId={unidad.id}
        moduloId={moduloId}
        unidadSlug={unidad.slug}
      />
      <CompletarUnidad moduloId={moduloId} unidad={unidad} siguiente={siguiente} />
      {!siguiente && (
        <>
          <ArtefactosPanel moduloId={moduloId} />
          <GatePanel />
        </>
      )}
      <nav className="mt-6 flex justify-between text-sm text-stone-500">
        {anterior ? (
          <Link href={`/modulo/${slug}/${anterior.slug}`} className="hover:text-stone-800 dark:hover:text-stone-200">
            ← {anterior.id}
          </Link>
        ) : (
          <Link href={`/modulo/${slug}`} className="hover:text-stone-800 dark:hover:text-stone-200">
            ← Módulo
          </Link>
        )}
        {siguiente && (isChecked(unidad.id) || unlocked) ? (
          <Link href={`/modulo/${slug}/${siguiente.slug}`} className="hover:text-stone-800 dark:hover:text-stone-200">
            {siguiente.id} →
          </Link>
        ) : (
          <Link href={`/modulo/${slug}`} className="hover:text-stone-800 dark:hover:text-stone-200">
            Índice →
          </Link>
        )}
      </nav>
    </>
  );
}
