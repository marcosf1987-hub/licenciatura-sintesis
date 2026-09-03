import Link from "next/link";
import { getEstadoModulo } from "@/lib/data";
import type { ModuloPlan } from "@/types";
import { StatusBadge } from "./StatusBadge";

export function ModuleCard({ modulo, estadoOverride }: { modulo: ModuloPlan; estadoOverride?: string }) {
  const estado = estadoOverride ?? getEstadoModulo(modulo.id);
  const bloqueado = estado === "bloqueado";

  return (
    <Link
      href={bloqueado ? "#" : `/modulo/${modulo.id.toLowerCase()}`}
      className={`block rounded-xl border p-4 transition ${
        bloqueado
          ? "cursor-not-allowed border-stone-200 opacity-50 dark:border-stone-800"
          : "border-stone-200 hover:border-stone-400 hover:shadow-sm dark:border-stone-800 dark:hover:border-stone-600"
      }`}
      aria-disabled={bloqueado}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="font-mono text-xs text-stone-500">{modulo.id}</span>
        <StatusBadge estado={estado} />
      </div>
      <h3 className="mb-1 font-medium leading-snug text-stone-900 dark:text-stone-100">
        {modulo.nombre}
      </h3>
      <p className="text-xs text-stone-500">
        {modulo.track} · {modulo.nivel.replace("-", " → ")}
      </p>
    </Link>
  );
}
