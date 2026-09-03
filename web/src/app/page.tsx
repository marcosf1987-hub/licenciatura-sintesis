import { DashboardLive } from "@/components/DashboardLive";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <section className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
          Estudios de Síntesis Profunda
        </h1>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          Formación personal · ritmo libre · 48 módulos
        </p>
      </section>
      <DashboardLive />
    </div>
  );
}
