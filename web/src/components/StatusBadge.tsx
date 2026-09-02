const styles: Record<string, string> = {
  bloqueado:
    "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400",
  disponible:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  en_curso:
    "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  evaluacion:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  aprobado:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200",
  reprobado: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
};

export function StatusBadge({ estado }: { estado: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[estado] ?? styles.bloqueado}`}
    >
      {estado.replace("_", " ")}
    </span>
  );
}
