import { DashboardLive } from "@/components/DashboardLive";
import { plan } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <section className="mb-10">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          {plan.programa.nombre}
        </h1>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          Comprender las estructuras profundas que sostienen lo visible, y
          explorar las zonas liminales donde producen mito o lo anómalo.
        </p>
      </section>
      <DashboardLive />
    </div>
  );
}
