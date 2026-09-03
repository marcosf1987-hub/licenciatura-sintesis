"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="mb-2 text-xl font-semibold">No se pudo cargar esta vista</h1>
      <p className="mb-4 text-sm text-stone-500">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-stone-900 px-4 py-2 text-sm text-white dark:bg-stone-100 dark:text-stone-900"
      >
        Reintentar
      </button>
    </div>
  );
}
