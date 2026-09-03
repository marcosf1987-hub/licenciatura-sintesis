"use client";

import { useEffect, useRef, useState } from "react";
import { endSession, startSession, type SessionKind } from "@/lib/supabase/progreso";

const IDLE_MS = 2 * 60 * 1000;
const FLUSH_EVERY_MS = 30 * 1000;

function formatElapsed(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  return `${m}:${String(r).padStart(2, "0")}`;
}

/**
 * Timer pasivo: cuenta solo con pestaña visible y actividad reciente.
 * No es gate; solo estadísticas.
 */
export function usePassiveTimer(opts: {
  enabled: boolean;
  moduloId: string;
  unidadId?: string;
  url?: string;
  kind?: SessionKind;
}) {
  const [elapsed, setElapsed] = useState(0);
  const [active, setActive] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const activeMsRef = useRef(0);
  const tickStartRef = useRef<number | null>(null);
  const lastActivityRef = useRef(Date.now());
  const optsRef = useRef(opts);
  optsRef.current = opts;

  useEffect(() => {
    if (!opts.enabled) return;

    let cancelled = false;
    let flushTimer: ReturnType<typeof setInterval> | undefined;

    async function open() {
      const id = await startSession({
        moduloId: optsRef.current.moduloId,
        unidadId: optsRef.current.unidadId,
        url: optsRef.current.url,
        kind: optsRef.current.kind ?? "lectura",
      });
      if (!cancelled) sessionIdRef.current = id;
    }
    void open();

    function bump() {
      lastActivityRef.current = Date.now();
    }

    function isIdle() {
      return Date.now() - lastActivityRef.current > IDLE_MS;
    }

    function isVisible() {
      return document.visibilityState === "visible";
    }

    function pauseTick() {
      if (tickStartRef.current != null) {
        activeMsRef.current += Date.now() - tickStartRef.current;
        tickStartRef.current = null;
        setElapsed(activeMsRef.current / 1000);
      }
      setActive(false);
    }

    function resumeTick() {
      if (!isVisible() || isIdle()) return;
      if (tickStartRef.current == null) {
        tickStartRef.current = Date.now();
        setActive(true);
      }
    }

    function onActivity() {
      bump();
      resumeTick();
    }

    function onVisibility() {
      if (isVisible()) {
        bump();
        resumeTick();
      } else {
        pauseTick();
      }
    }

    async function flush() {
      pauseTick();
      const id = sessionIdRef.current;
      if (id && activeMsRef.current > 0) {
        await endSession(id, activeMsRef.current / 1000);
      }
      resumeTick();
    }

    const events = ["mousemove", "keydown", "scroll", "touchstart", "click"] as const;
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    document.addEventListener("visibilitychange", onVisibility);

    const idleCheck = setInterval(() => {
      if (isIdle()) pauseTick();
      else resumeTick();
      setElapsed(
        (activeMsRef.current +
          (tickStartRef.current ? Date.now() - tickStartRef.current : 0)) /
          1000
      );
    }, 1000);

    flushTimer = setInterval(() => {
      void flush();
    }, FLUSH_EVERY_MS);

    bump();
    resumeTick();

    return () => {
      cancelled = true;
      events.forEach((e) => window.removeEventListener(e, onActivity));
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(idleCheck);
      if (flushTimer) clearInterval(flushTimer);
      pauseTick();
      const id = sessionIdRef.current;
      if (id && activeMsRef.current > 0) {
        void endSession(id, activeMsRef.current / 1000);
      }
    };
  }, [opts.enabled, opts.moduloId, opts.unidadId, opts.url, opts.kind]);

  return { elapsed, active, label: formatElapsed(elapsed) };
}
