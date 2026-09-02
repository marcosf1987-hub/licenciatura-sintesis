# Arquitectura — Hardware, software y plataforma

> Versión 1.0 · Alineada con `modelo_estudio.md` (ritmo libre, horas pasivas).

---

## Decisión de arquitectura

**Monorepo GitHub + Next.js en Vercel + Supabase (progreso) + contenido en git.**

La webapp es el **centro de consumo** (especialmente móvil), pero **no es dependencia** para estudiar: el contenido vive en el repo y puede leerse/exportarse sin plataforma.

---

## Capas

```
┌──────────────────────────────────────────────────────────────┐
│  PWA Next.js (Vercel) — celular + PC                          │
│  · Leer módulos · marcar programa · artefactos · evaluación  │
│  · Analytics: horas pasivas (session time en contenido)      │
└───────────────────────────┬──────────────────────────────────┘
                            │
     ┌──────────────────────┼──────────────────────┐
     ▼                      ▼                      ▼
┌─────────────┐    ┌─────────────────┐    ┌─────────────┐
│ GitHub      │    │ Supabase        │    │ API routes  │
│ Contenido   │    │ Progreso,       │    │ IA opcional │
│ MD/JSON     │    │ sesiones,       │    │ evaluación  │
│ inmutable   │    │ borradores      │    │             │
└─────────────┘    └─────────────────┘    └─────────────┘
```

---

## Qué vive dónde

| Dato | Ubicación | ¿Gate? |
|---|---|---|
| Plan, programas, bibliografías, rúbricas | **Git** (`/content`) | — |
| Estado módulo, calificaciones | **Supabase** + export a `progreso.json` | Sí (evaluación) |
| Checklist programa / bibliografía | **Supabase** o `modulo.md` en git | Sí |
| Artefactos de estudio | **Supabase Storage** o git (`artefactos/`) | Sí (≥1) |
| **Horas plataforma** | **Supabase** (`session_events`) | **No** — solo stats |
| Exámenes corregidos | Supabase + archivo en git | Registro |
| Exámenes modelo (fallback sin IA) | **Git** | — |

---

## Horas pasivas (webapp)

### Qué se mide

- Tiempo con la pestaña/app **activa** en pantallas de estudio del módulo.
- Pausa tras N minutos de inactividad (no contar scroll ausente).
- Opcional: tiempo en lecturas PDF embebidas / quizzes de práctica.

### Qué NO se mide como requisito

- Horas totales para desbloquear evaluación
- Semanas calendario
- Checkpoints manuales

### Schema orientativo (Supabase)

```sql
-- Solo analytics; nunca usado en gates
create table session_events (
  id uuid primary key default gen_random_uuid(),
  modulo_id text not null,
  started_at timestamptz not null,
  ended_at timestamptz,
  duration_seconds int,
  source text default 'webapp'  -- 'webapp' | 'mobile_pwa'
);
```

### Export periódico

Cron semanal: agregar `horas_plataforma` por módulo → commit a `progreso.json` en git (backup legible sin Supabase).

---

## Gates en la webapp (UI)

Botón **“Solicitar evaluación”** habilitado cuando:

1. Programa ≥ 90% (checkboxes en UI)
2. Bibliografía obligatoria marcada
3. ≥ 1 artefacto subido o linkeado

**No** se consulta `duration_seconds` ni fechas de inicio.

---

## IA

| Función | Implementación | Sin IA |
|---|---|---|
| Generar examen | `POST /api/evaluacion/generar` | Examen modelo en `/content` |
| Corregir | `POST /api/evaluacion/corregir` | Autoevaluación + rúbrica pública |
| Tutor | Chat opcional | Bibliografía + notas propias |

---

## Fases de implementación

| Fase | Entregable | Estudio posible |
|---|---|---|
| **0** | Carpeta local actual | ✅ Ya |
| **1** | GitHub + Next lectura (plan, M01) | ✅ |
| **2** | Supabase progreso + checklist + artefactos | ✅ |
| **3** | Horas pasivas + dashboard stats | ✅ |
| **4** | API evaluador IA + fallback modelos | ✅ |

---

## Backup y resiliencia 10 años

1. **Git** = verdad del curriculum
2. **Export semanal** Supabase → JSON en repo
3. **Mirror opcional** Drive (zip mensual)
4. Sin IA: estudio + exámenes modelo + autoevaluación
5. Sin Supabase: `progreso.json` manual en git + estudio desde MD local

---

## Stack

- **Repo:** GitHub privado
- **App:** Next.js 14+ (App Router), TypeScript, Tailwind
- **Host:** Vercel
- **DB:** Supabase (Postgres + Auth + Storage)
- **Contenido:** MDX/Markdown en `/content`
- **PWA:** manifest + service worker (lectura offline del módulo activo)

---

## Consumo móvil vs PC

| Acción | Dispositivo |
|---|---|
| Lectura, checklist, quizzes práctica | Celular (PWA) |
| Ensayos L3, evaluaciones largas | PC (recomendado) |
| Subir artefactos | Ambos |
| Horas pasivas | Ambos (automático) |

---

*Próximo paso técnico: Fase 1 (scaffold repo + deploy Vercel) cuando decidas avanzar.*
