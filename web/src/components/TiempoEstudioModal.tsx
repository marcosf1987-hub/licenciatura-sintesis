"use client";

import { useEffect, useId, useRef, useState } from "react";

const PRESETS = [30, 60, 90, 120, 180, 240];

export function TiempoEstudioModal({
  open,
  unidadLabel,
  initialMinutes,
  onConfirm,
  onCancel,
  busy,
}: {
  open: boolean;
  unidadLabel: string;
  initialMinutes?: number | null;
  onConfirm: (minutos: number) => void;
  onCancel: () => void;
  busy?: boolean;
}) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [horas, setHoras] = useState(0);
  const [mins, setMins] = useState(60);

  useEffect(() => {
    if (!open) return;
    const total = initialMinutes && initialMinutes > 0 ? initialMinutes : 60;
    setHoras(Math.floor(total / 60));
    setMins(total % 60);
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open, initialMinutes]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !busy) onCancel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, busy, onCancel]);

  if (!open) return null;

  const total = Math.max(0, horas * 60 + mins);

  function applyPreset(m: number) {
    setHoras(Math.floor(m / 60));
    setMins(m % 60);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (total <= 0 || busy) return;
    onConfirm(total);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/40 p-4 sm:items-center"
      role="presentation"
      onClick={() => !busy && onCancel()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-5 shadow-xl dark:border-stone-700 dark:bg-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="text-base font-medium text-stone-900 dark:text-stone-100">
          ¿Cuánto estudiaste {unidadLabel}?
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
          Incluí lectura, práctica y tiempo fuera de la plataforma. Es la métrica
          principal de estudio; el tiempo en pantalla es solo complementario.
        </p>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => applyPreset(p)}
                className={`rounded-lg border px-2.5 py-1 text-xs tabular-nums transition ${
                  total === p
                    ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                    : "border-stone-200 text-stone-600 hover:border-stone-400 dark:border-stone-700 dark:text-stone-300"
                }`}
              >
                {p < 60 ? `${p} min` : p % 60 === 0 ? `${p / 60} h` : `${Math.floor(p / 60)} h ${p % 60}`}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-3">
            <label className="flex-1 text-xs text-stone-500">
              Horas
              <input
                ref={inputRef}
                type="number"
                min={0}
                max={168}
                value={horas}
                onChange={(e) => setHoras(Math.max(0, Number(e.target.value) || 0))}
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm tabular-nums dark:border-stone-600 dark:bg-stone-950"
              />
            </label>
            <label className="flex-1 text-xs text-stone-500">
              Minutos
              <input
                type="number"
                min={0}
                max={59}
                value={mins}
                onChange={(e) =>
                  setMins(Math.min(59, Math.max(0, Number(e.target.value) || 0)))
                }
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm tabular-nums dark:border-stone-600 dark:bg-stone-950"
              />
            </label>
          </div>

          <p className="text-xs text-stone-500">
            Total:{" "}
            <span className="font-medium text-stone-800 dark:text-stone-200 tabular-nums">
              {total === 0
                ? "—"
                : total < 60
                  ? `${total} min`
                  : `${Math.floor(total / 60)} h${total % 60 ? ` ${total % 60} min` : ""}`}
            </span>
          </p>

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={busy || total <= 0}
              className="flex-1 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40 dark:bg-stone-100 dark:text-stone-900"
            >
              {busy ? "Guardando…" : "Guardar y completar"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={busy}
              className="rounded-lg px-3 py-2.5 text-sm text-stone-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
