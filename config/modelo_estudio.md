# Modelo de estudio — Opción A (ritmo libre)

> Versión 1.1 · Sin horas ni checkpoints como requisito.

---

## Principio

**La exigencia está en el dominio demostrado (evaluación), no en el reloj ni en el calendario.**

Podés completar un módulo en 10 días de vacaciones intensivas o en 4 meses de ritmo normal. Nada te bloquea por no haber “cumplido semanas”.

---

## Qué SÍ es obligatorio (gate único antes de evaluar)

Para pasar de `en_curso` → `evaluacion` y rendir el examen:

| # | Requisito | Verificación |
|---|---|---|
| 1 | **Programa analítico ≥ 90%** cubierto | Checklist en `modulo.md` |
| 2 | **Bibliografía obligatoria** leída | Declaración + artefactos que lo evidencien |
| 3 | **≥ 1 artefacto de estudio** | Notas, mapa conceptual, ejercicios resueltos, ficha en `artefactos/` |
| 4 | **Autodeclaración de listo** | Cambiás estado a `evaluacion` cuando vos decidís |

**No obligatorio:**

- Registrar horas (manual o automático)
- Completar N semanas de calendario
- Archivos semanales
- Ritmo mínimo o máximo
- Estar logueado en la webapp

---

## Qué pasa con las “60 horas” y las “8 semanas”

Son **referencias de diseño**, no condiciones:

| Concepto | Significado |
|---|---|
| **~60 h orientativas** | Densidad aproximada de una materia universitaria al ~60% |
| **~8 semanas sugeridas** | Ritmo cómodo a 1 h/día; podés ignorarlo |
| **6 módulos/año** | Proyección si cursás ~1 módulo cada 2 meses; no es plazo fijo |

El plan de 7 años es una **estimación**, no un contrato.

---

## Horas en la webapp (opcional, pasivo)

Cuando exista la plataforma:

- Se miden **automáticamente** mientras consumís contenido logueado (lectura de módulo, videos, quizzes de práctica).
- Van a **estadísticas** (`horas_plataforma` en `progreso.json`).
- **No desbloquean ni bloquean** nada.
- Sirven para: curiosidad, gráficos, comparar módulos, estimar cobertura real vs. orientativa.

Estudio offline (libro en papel, PDF sin webapp) **no se penaliza**; simplemente no suma en analytics.

---

## Registro opcional (sin fricción)

Si querés dejar huella sin burocracia:

| Artefacto | Obligatorio | Uso |
|---|---|---|
| `artefactos/` (notas, mapas, ejercicios) | **Sí** (≥1) | Evidencia mínima de estudio |
| `notas/` o diario libre | No | Cuando te sirva |
| `semanas/SXX.md` | **No** | Solo si te gusta el hábito |
| Horas manuales | **No** | Eliminado |

---

## Flujo de estados (simplificado)

```
disponible → en_curso → evaluacion → aprobado | reprobado
                ↑            │
                └────────────┘ (reintento tras reprobación)
```

**Transición a `evaluacion`:** vos declarás listo cuando cumplís checklist (programa + bibliografía + artefacto). Sin validación temporal.

**Transición a `aprobado`:** solo la evaluación ≥ 70% (con pisos por componente en L2/L3).

---

## Vacaciones, aceleración, pausas

| Situación | Comportamiento |
|---|---|
| Semana sin estudiar | Nada pasa |
| Vacaciones estudiando el doble | Avanzás más rápido; bienvenido |
| Pausa de 3 meses | El módulo queda `en_curso`; no expira |
| Terminar M01 en 12 días | OK si cumplís checklist y aprobás evaluación |

---

## Relación con constancia (Duolingo)

Tu constancia ya está en el hábito diario. El sistema **no duplica** eso con logs.  
La **evaluación periódica** (cada módulo aprobado) es el mecanismo de accountability, no el cronómetro.

---

## Documentos que implementan este modelo

- `config/reglas_progresion.md`
- `config/protocolo_evaluacion.md` §2
- `config/arquitectura.md` (horas pasivas en webapp)
- `config/flujo_trabajo.md`
