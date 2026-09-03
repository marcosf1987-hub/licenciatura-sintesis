"use client";

import { useCallback, useEffect, useState } from "react";
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
import { watchAuth } from "@/lib/supabase/client";

export function useChecklist(moduloId: string, totalUnidades = 8) {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [gate, setGate] = useState<GateStatus>({
    programaPct: 0,
    biblioCompleta: false,
    tieneArtefacto: false,
    puedeEvaluar: false,
  });
  const [estadoModulo, setEstadoModulo] = useState<ModuloEstado | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar sesión
  useEffect(() => {
    return watchAuth((next) => setUser(next ? { id: next.id } : null));
  }, []);

  // Cargar datos
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

  const toggle = useCallback(
    async (itemKey: string, itemType: ChecklistItem["item_type"], current: boolean) => {
      if (!user) return;
      // optimistic
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.item_key === itemKey);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], checked: !current };
          return next;
        }
        return [...prev, { item_key: itemKey, item_type: itemType, checked: !current }];
      });

      await setChecklistItem(moduloId, itemKey, itemType, !current);

      // si el módulo está disponible y el usuario acaba de marcar algo → pasar a en_curso
      if (estadoModulo?.estado === "disponible" || estadoModulo?.estado === null) {
        await setModuloEstado(moduloId, "en_curso");
        setEstadoModulo((prev) => ({ ...(prev ?? { calificacion: null, fecha_inicio: null, fecha_aprobacion: null, intentos_evaluacion: 0 }), estado: "en_curso", fecha_inicio: new Date().toISOString() }));
      }

      // recalcular gate
      const g = await calcularGate(moduloId, totalUnidades);
      setGate(g);
    },
    [moduloId, totalUnidades, user, estadoModulo]
  );

  const solicitarEvaluacion = useCallback(async () => {
    if (!gate.puedeEvaluar) return;
    await setModuloEstado(moduloId, "evaluacion");
    setEstadoModulo((prev) => ({ ...(prev!), estado: "evaluacion" }));
  }, [moduloId, gate.puedeEvaluar]);

  function isChecked(itemKey: string) {
    return items.find((i) => i.item_key === itemKey)?.checked ?? false;
  }

  return { user, items, gate, estadoModulo, loading, toggle, isChecked, solicitarEvaluacion, reload };
}
