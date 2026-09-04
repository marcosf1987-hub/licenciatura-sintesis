"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addArtefacto,
  deleteArtefacto,
  getArtefactos,
  type Artefacto,
  type ArtefactoTipo,
} from "@/lib/supabase/progreso";
import { useProgreso } from "./progreso";

const TIPOS: { value: ArtefactoTipo; label: string }[] = [
  { value: "nota", label: "Nota" },
  { value: "ejercicios", label: "Ejercicios" },
  { value: "mapa", label: "Mapa" },
  { value: "ensayo", label: "Ensayo" },
  { value: "otro", label: "Otro" },
];

function tipoLabel(t: string) {
  return TIPOS.find((x) => x.value === t)?.label ?? t;
}

function formatFecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return "";
  }
}

export function ArtefactosPanel({ moduloId }: { moduloId: string }) {
  const { user, loading, reload } = useProgreso();
  const [items, setItems] = useState<Artefacto[]>([]);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<ArtefactoTipo>("nota");
  const [contenido, setContenido] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    try {
      setItems(await getArtefactos(moduloId));
    } catch {
      setItems([]);
    }
  }, [user, moduloId]);

  useEffect(() => {
    void load();
  }, [load]);

  if (!user || loading) return null;

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      await addArtefacto(moduloId, nombre, tipo, contenido);
      setNombre("");
      setContenido("");
      setTipo("nota");
      setOpen(false);
      await load();
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (busy) return;
    if (!confirm("¿Borrar este trabajo?")) return;
    setBusy(true);
    try {
      await deleteArtefacto(id);
      await load();
      await reload();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-10 rounded-xl border border-stone-200 p-5 dark:border-stone-800">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-medium text-stone-800 dark:text-stone-200">
          Trabajos del módulo
        </h2>
        <span className="text-xs text-stone-500 tabular-nums">
          {items.length === 0 ? "Ninguno aún" : `${items.length}`}
        </span>
      </div>
      <p className="mb-4 text-xs text-stone-500">
        Guardá al menos uno (notas, ejercicios, mapa o ensayo) para poder pedir evaluación.
      </p>

      {items.length > 0 && (
        <ul className="mb-4 divide-y divide-stone-100 dark:divide-stone-800">
          {items.map((a) => (
            <li key={a.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  className="min-w-0 flex-1 text-left"
                  onClick={() =>
                    setExpanded((prev) => (prev === a.id ? null : a.id))
                  }
                >
                  <p className="truncate text-sm font-medium">{a.nombre}</p>
                  <p className="text-xs text-stone-500">
                    {tipoLabel(a.tipo)}
                    {a.created_at ? ` · ${formatFecha(a.created_at)}` : ""}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(a.id)}
                  disabled={busy}
                  className="shrink-0 text-xs text-stone-400 hover:text-red-600"
                >
                  Borrar
                </button>
              </div>
              {expanded === a.id && a.contenido && (
                <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-stone-50 p-3 text-xs text-stone-700 dark:bg-stone-900 dark:text-stone-300">
                  {a.contenido}
                </pre>
              )}
              {expanded === a.id && !a.contenido && (
                <p className="mt-2 text-xs text-stone-400">Sin contenido guardado.</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {open ? (
        <form
          onSubmit={handleCreate}
          className="space-y-3 border-t border-stone-100 pt-4 dark:border-stone-800"
        >
          <div>
            <label className="mb-1 block text-xs text-stone-500" htmlFor="art-nombre">
              Título
            </label>
            <input
              id="art-nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              maxLength={120}
              placeholder="p. ej. U1 — 8 argumentos"
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500" htmlFor="art-tipo">
              Tipo
            </label>
            <select
              id="art-tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as ArtefactoTipo)}
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
            >
              {TIPOS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500" htmlFor="art-contenido">
              Contenido
            </label>
            <textarea
              id="art-contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={8}
              placeholder="Pegá notas, ejercicios o el borrador del ensayo…"
              className="w-full resize-y rounded-lg border border-stone-300 bg-white px-3 py-2 font-mono text-xs leading-relaxed dark:border-stone-700 dark:bg-stone-950"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy || !nombre.trim()}
              className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40 dark:bg-stone-100 dark:text-stone-900"
            >
              {busy ? "Guardando…" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-stone-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-lg border border-dashed border-stone-300 px-4 py-2.5 text-sm text-stone-600 transition hover:border-stone-500 hover:text-stone-900 dark:border-stone-700 dark:hover:border-stone-500 dark:hover:text-stone-100"
        >
          + Nuevo trabajo
        </button>
      )}
    </section>
  );
}
