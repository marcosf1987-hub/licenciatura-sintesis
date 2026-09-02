import type { ModuloOpcional } from "@/types";
import { StatusBadge } from "./StatusBadge";

export function OptionalModuleCard({ modulo }: { modulo: ModuloOpcional }) {
  return (
    <div className="block rounded-xl border border-dashed border-stone-300 p-4 opacity-80 dark:border-stone-700">
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="font-mono text-xs text-stone-500">{modulo.id}</span>
        <StatusBadge estado="bloqueado" />
      </div>
      <h3 className="mb-1 font-medium leading-snug text-stone-900 dark:text-stone-100">
        {modulo.nombre}
      </h3>
      <p className="text-xs text-stone-500">Track {modulo.track} · opcional</p>
      {modulo.prerrequisitos.length > 0 && (
        <p className="mt-2 text-xs text-stone-400">
          Req: {modulo.prerrequisitos.join(", ")}
        </p>
      )}
    </div>
  );
}
