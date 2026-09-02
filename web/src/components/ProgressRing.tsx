export function ProgressRing({
  value,
  total,
  label,
}: {
  value: number;
  total: number;
  label: string;
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="88" height="88" className="-rotate-90">
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-stone-200 dark:text-stone-800"
        />
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-stone-800 transition-all dark:text-stone-200"
        />
      </svg>
      <div className="text-center">
        <p className="text-2xl font-semibold tabular-nums">{pct}%</p>
        <p className="text-xs text-stone-500">{label}</p>
        <p className="text-xs text-stone-400">
          {value}/{total} módulos
        </p>
      </div>
    </div>
  );
}
