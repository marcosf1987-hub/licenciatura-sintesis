"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePassiveTimer } from "@/hooks/usePassiveTimer";
import { watchAuth } from "@/lib/supabase/client";
import { useEffect } from "react";

export function ReadingClient({
  moduloId,
  unidadSlug,
  unidadLabel,
  url,
  title,
}: {
  moduloId: string;
  unidadSlug: string;
  unidadLabel: string;
  url: string;
  title: string;
}) {
  const [user, setUser] = useState(false);
  const [iframeOk, setIframeOk] = useState(true);

  useEffect(() => watchAuth((u) => setUser(!!u)), []);

  const timer = usePassiveTimer({
    enabled: user,
    moduloId,
    unidadId: unidadLabel,
    url,
    kind: "lectura",
  });

  const backHref = useMemo(
    () => `/modulo/${moduloId.toLowerCase()}/${unidadSlug}`,
    [moduloId, unidadSlug]
  );

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/95 px-4 py-3 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={backHref}
              className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
            >
              ← Volver a {unidadLabel}
            </Link>
            <h1 className="truncate text-sm font-medium">{title || "Lectura"}</h1>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {user ? (
              <span
                className={`rounded-full px-2.5 py-1 font-mono tabular-nums ${
                  timer.active
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                }`}
                title={timer.active ? "Contando tiempo" : "Pausado (inactivo o pestaña oculta)"}
              >
                {timer.label}
              </span>
            ) : (
              <Link href="/login" className="underline underline-offset-2">
                Iniciá sesión para medir tiempo
              </Link>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-stone-300 px-2.5 py-1 dark:border-stone-700"
            >
              Abrir afuera
            </a>
          </div>
        </div>
      </header>

      <div className="relative mx-auto w-full max-w-5xl flex-1 px-2 py-3 sm:px-4">
        {iframeOk ? (
          <iframe
            title={title || "Lectura"}
            src={url}
            className="h-[calc(100vh-11rem)] w-full rounded-xl border border-stone-200 bg-white dark:border-stone-800"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            referrerPolicy="no-referrer"
            onError={() => setIframeOk(false)}
            onLoad={(e) => {
              // Cross-origin: no podemos inspeccionar. Si el sitio bloquea, suele quedar en blanco.
              try {
                const doc = e.currentTarget.contentDocument;
                if (doc && doc.body && doc.body.innerHTML.trim() === "") {
                  setIframeOk(false);
                }
              } catch {
                // acceso bloqueado = el iframe puede estar mostrando el sitio igual
              }
            }}
          />
        ) : null}

        {!iframeOk && (
          <div className="flex h-[calc(100vh-11rem)] flex-col items-center justify-center rounded-xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center dark:border-stone-700 dark:bg-stone-900/40">
            <p className="mb-2 text-sm font-medium">Este sitio no permite embeberse aquí</p>
            <p className="mb-6 max-w-md text-xs text-stone-500">
              El timer sigue corriendo mientras esta pestaña esté activa. Abrí el texto afuera y volvé cuando termines.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
            >
              Abrir lectura
            </a>
            <button
              type="button"
              className="mt-4 text-xs text-stone-500 underline"
              onClick={() => setIframeOk(true)}
            >
              Reintentar iframe
            </button>
          </div>
        )}

        {iframeOk && (
          <p className="mt-2 text-center text-[11px] text-stone-400">
            Si ves pantalla en blanco, usá «Abrir afuera». El tiempo se mide en esta página.
          </p>
        )}
      </div>
    </div>
  );
}
