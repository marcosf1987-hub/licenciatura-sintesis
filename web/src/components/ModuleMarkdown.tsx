"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { watchAuth } from "@/lib/supabase/client";
import {
  calcularGate,
  getChecklist,
  getModuloEstado,
  setChecklistItem,
  setModuloEstado,
  type ChecklistItem,
  type GateStatus,
  type ModuloEstado,
} from "@/lib/supabase/progreso";

// ─────────────────────────────────────────────────────────────────────────────
// Contexto de progreso (un único fetch por módulo)
// ─────────────────────────────────────────────────────────────────────────────

interface ProgresoCtx {
  user: { id: string } | null;
  items: ChecklistItem[];
  gate: GateStatus;
  estadoModulo: ModuloEstado | null;
  loading: boolean;
  isChecked: (key: string) => boolean;
  toggle: (key: string, type: ChecklistItem["item_type"], current: boolean) => void;
  solicitarEvaluacion: () => void;
}

const Ctx = createContext<ProgresoCtx>({
  user: null, items: [], gate: { programaPct: 0, biblioCompleta: false, tieneArtefacto: false, puedeEvaluar: false },
  estadoModulo: null, loading: true,
  isChecked: () => false,
  toggle: () => {},
  solicitarEvaluacion: () => {},
});

function ProgresoProvider({ children, moduloId, totalUnidades = 8 }: {
  children: ReactNode;
  moduloId: string;
  totalUnidades?: number;
}) {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [gate, setGate] = useState<GateStatus>({ programaPct: 0, biblioCompleta: false, tieneArtefacto: false, puedeEvaluar: false });
  const [estadoModulo, setEstadoModulo] = useState<ModuloEstado | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return watchAuth((next) => setUser(next ? { id: next.id } : null));
  }, []);

  const reload = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    const [lista, g, est] = await Promise.all([
      getChecklist(moduloId),
      calcularGate(moduloId, totalUnidades),
      getModuloEstado(moduloId),
    ]);
    setItems(lista);
    setGate(g);
    setEstadoModulo(est);
    setLoading(false);
  }, [moduloId, totalUnidades, user]);

  useEffect(() => { reload(); }, [reload]);

  const toggle = useCallback(async (itemKey: string, itemType: ChecklistItem["item_type"], current: boolean) => {
    if (!user) return;
    const next = !current;
    setItems(prev => {
      const idx = prev.findIndex(i => i.item_key === itemKey);
      if (idx >= 0) { const a = [...prev]; a[idx] = { ...a[idx], checked: next }; return a; }
      return [...prev, { item_key: itemKey, item_type: itemType, checked: next }];
    });
    await setChecklistItem(moduloId, itemKey, itemType, next);
    // primer check → pasar a en_curso
    if (!estadoModulo || estadoModulo.estado === "disponible") {
      await setModuloEstado(moduloId, "en_curso");
      setEstadoModulo(prev => ({ ...(prev ?? { calificacion: null, fecha_aprobacion: null, intentos_evaluacion: 0, fecha_inicio: null }), estado: "en_curso" as const, fecha_inicio: new Date().toISOString() }));
    }
    const g = await calcularGate(moduloId, totalUnidades);
    setGate(g);
  }, [moduloId, totalUnidades, user, estadoModulo]);

  const solicitarEvaluacion = useCallback(async () => {
    if (!gate.puedeEvaluar) return;
    await setModuloEstado(moduloId, "evaluacion");
    setEstadoModulo(prev => ({ ...prev!, estado: "evaluacion" as const }));
  }, [moduloId, gate.puedeEvaluar]);

  const isChecked = useCallback((key: string) =>
    items.find(i => i.item_key === key)?.checked ?? false,
  [items]);

  return (
    <Ctx.Provider value={{ user, items, gate, estadoModulo, loading, isChecked, toggle, solicitarEvaluacion }}>
      {children}
    </Ctx.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node)
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  return "";
}

function itemKeyFromText(text: string, idx: number): { key: string; itemType: ChecklistItem["item_type"] } {
  const t = text.trim();
  const uMatch = t.match(/^\*{0,2}(U\d+)\*{0,2}/i);
  if (uMatch) return { key: uMatch[1].toUpperCase(), itemType: "programa" };
  const u2 = t.toUpperCase();
  if (/BIBLIO|BIBLIOGRAF|LECTURA OBLIGATORIA/.test(u2)) return { key: `BIBLIO_${idx}`, itemType: "biblio" };
  if (/ARTEFACTO|EVIDENCIA|EVALUACI/.test(u2)) return { key: `EV_${idx}`, itemType: "evidencia" };
  return { key: `ITEM_${idx}`, itemType: "evidencia" };
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth banner
// ─────────────────────────────────────────────────────────────────────────────

function AuthBanner() {
  const { user, loading } = useContext(Ctx);
  if (loading || user) return null;
  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400">
      <Link href="/login" className="font-medium underline underline-offset-2">
        Iniciá sesión
      </Link>{" "}
      para guardar tu progreso y habilitar la evaluación.
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Gate panel
// ─────────────────────────────────────────────────────────────────────────────

function GatePanel() {
  const { gate, estadoModulo, user, loading, solicitarEvaluacion } = useContext(Ctx);
  if (!user || loading) return null;

  const estado = estadoModulo?.estado ?? "disponible";
  const yaEvaluacion = estado === "evaluacion" || estado === "aprobado";

  return (
    <div className="mt-10 rounded-xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-900/40">
      <p className="mb-3 text-sm font-medium text-stone-800 dark:text-stone-200">
        Progreso hacia evaluación
      </p>

      <div className="mb-3">
        <div className="mb-1 flex justify-between text-xs text-stone-500">
          <span>Programa cubierto</span>
          <span className={gate.programaPct >= 90 ? "font-medium text-emerald-600" : ""}>{gate.programaPct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${gate.programaPct >= 90 ? "bg-emerald-500" : "bg-stone-400"}`}
            style={{ width: `${gate.programaPct}%` }}
          />
        </div>
      </div>

      <ul className="mb-4 space-y-1.5 text-xs">
        {[
          { ok: gate.programaPct >= 90, label: "Programa ≥ 90%" },
          { ok: gate.biblioCompleta, label: "Bibliografía obligatoria leída" },
          { ok: gate.tieneArtefacto, label: "≥ 1 artefacto de estudio" },
        ].map(({ ok, label }) => (
          <li key={label} className={`flex items-center gap-2 ${ok ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400"}`}>
            <span className="w-4 text-center">{ok ? "✓" : "○"}</span>
            <span>{label}</span>
          </li>
        ))}
      </ul>

      {yaEvaluacion ? (
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {estado === "aprobado" ? "✓ Módulo aprobado" : "⏳ Evaluación solicitada — contactar al Agente Evaluador"}
        </p>
      ) : (
        <button
          onClick={solicitarEvaluacion}
          disabled={!gate.puedeEvaluar}
          className="w-full rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
        >
          {gate.puedeEvaluar ? "Solicitar evaluación" : "Gates pendientes"}
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Markdown renderer con checkboxes conectados al contexto
// ─────────────────────────────────────────────────────────────────────────────

function MarkdownContent({ content }: { content: string }) {
  const { user, isChecked, toggle } = useContext(Ctx);
  const taskIdxRef = useRef(0);
  const cellIdxRef = useRef(0);
  taskIdxRef.current = 0;
  cellIdxRef.current = 0;

  return (
    <article className="prose prose-stone max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-stone-800 dark:prose-a:text-stone-200 prose-li:my-0.5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          li({ children, ...props }) {
            const childArr = Array.isArray(children) ? children : [children];
            const hasCheckbox = childArr.some(
              c => c && typeof c === "object" && "props" in c &&
                (c as { props: { type?: string } }).props.type === "checkbox"
            );
            if (!hasCheckbox) return <li {...props}>{children}</li>;

            const text = extractText(children);
            const idx = taskIdxRef.current++;
            const { key: itemKey, itemType } = itemKeyFromText(text, idx);
            const checked = user ? isChecked(itemKey) : false;

            return (
              <li {...props} style={{ listStyle: "none", paddingLeft: 0 }} className="flex items-start gap-0">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(itemKey, itemType, checked)}
                  className="mr-2 mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-stone-300 accent-stone-800 dark:accent-stone-200"
                />
                <span>
                  {childArr.filter(c => !(c && typeof c === "object" && "props" in c && (c as { props: { type?: string } }).props.type === "checkbox"))}
                </span>
              </li>
            );
          },
          td({ children, ...props }) {
            const text = extractText(children).trim();
            const match = text.match(/^\[([ xX])\]$/);
            if (match) {
              const idx = cellIdxRef.current++;
              const itemKey = `cell_${idx}`;
              const defChecked = match[1].toLowerCase() === "x";
              const checked = user ? isChecked(itemKey) : defChecked;
              return (
                <td {...props}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(itemKey, "evidencia", checked)}
                    className="h-4 w-4 cursor-pointer rounded border-stone-300 accent-stone-800 dark:accent-stone-200"
                  />
                </td>
              );
            }
            return <td {...props}>{children}</td>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Export principal
// ─────────────────────────────────────────────────────────────────────────────

export function ModuleMarkdown({ content, moduloId }: { content: string; moduloId: string }) {
  return (
    <ProgresoProvider moduloId={moduloId}>
      <AuthBanner />
      <MarkdownContent content={content} />
      <GatePanel />
    </ProgresoProvider>
  );
}
