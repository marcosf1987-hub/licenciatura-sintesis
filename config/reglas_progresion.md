# Reglas de progresión y evaluación

## 1. Unidades de estudio

| Concepto | Definición |
|---|---|
| **Módulo** | Unidad de cursada: 60 h, ~8 semanas, ~2 meses |
| **Año académico** | 6 módulos secuenciales (~360 h) |
| **Track** | Eje paralelo: T, V, M, F, S, X, H |
| **Nivel** | L1 (panorama), L2 (orientado), L3 (profundo) |

## 2. Estados de un módulo

```
bloqueado ──→ disponible ──→ en_curso ──→ evaluacion ──→ aprobado
                                              │
                                              └──→ reprobado ──→ en_curso (reintento)
```

| Estado | Significado |
|---|---|
| `bloqueado` | Prerrequisitos no cumplidos |
| `disponible` | Puede iniciarse |
| `en_curso` | Cursada activa |
| `evaluacion` | Horas completadas; pendiente examen |
| `aprobado` | ≥70% en rúbrica; desbloquea dependientes |
| `reprobado` | <70%; requiere cambio de método antes de reintentar |

## 3. Reglas de desbloqueo

1. Un módulo L3 **requiere** todos sus prerrequisitos en estado `aprobado`.
2. **Un solo módulo activo** a la vez (1 h/día no permite 2 módulos en paralelo).
3. Los módulos se cursan **en orden numérico** (M01 → M48).

## 4. Evaluación por nivel

> **Protocolo detallado:** `config/protocolo_evaluacion.md`  
> **Instrucciones del agente:** `config/agente_evaluador.md`  
> **Escalas rápidas:** `config/rubricas/resumen_escalas.md`

### L1 (lectura complementaria, sin módulo propio)
- Quiz corto (10 preguntas) o ficha de lectura de 1 página.
- Umbral: 60%. Sin bloqueo de avance.

### L2 (módulos orientados o prerrequisitos instrumentales)
- Quiz (40%) + ensayo corto o explicación escrita (40%) + mapa conceptual (20%).
- Umbral: **70%**.
- Tiempo: evaluación asincrónica, máx. 90 min.

### L3 (módulos de profundidad universitaria)
- Examen conceptual (50%): preguntas de desarrollo, sin consulta.
- Aplicación (30%): caso, problema o análisis de texto primario.
- Síntesis (20%): ensayo de 800–1200 palabras o exposición escrita equivalente.
- Umbral: **70%** global; ningún componente <50%.
- Tiempo: examen en una sesión; ensayo en 72 h.

## 5. Reprobación

| Intento | Acción |
|---|---|
| 1.ª reprobación | Diagnóstico de fallas + 7 días de estudio focalizado + reintento |
| 2.ª reprobación | **Cambio de método:** bibliografía alternativa, tutoría IA con enfoque distinto, ejercicios adicionales. 15 días mínimo antes del 3.er intento |
| 3.er intento | Última instancia con evaluación reformulada |
| Tras 3 reprobaciones | Revisión del plan con el director académico; no se baja el nivel |

## 6. Registro de avance (sin horas obligatorias)

> Modelo completo: `config/modelo_estudio.md`

- **No** se registran horas como requisito.
- **No** se exigen checkpoints semanales ni mínimo de calendario.
- El avance se mide por: **programa cubierto + bibliografía + artefacto(s) + evaluación aprobada**.
- Registro opcional: notas en `artefactos/` o `notas/`; `semanas/` solo si te sirve.
- En webapp: horas pasivas solo para **estadísticas** (`horas_plataforma`), nunca como gate.

## 7. Evidencias obligatorias por módulo aprobado

- [ ] Programa cubierto (temario ≥ 90%)
- [ ] Bibliografía obligatoria leída
- [ ] Al menos 1 artefacto de estudio (notas, mapa, ejercicios)
- [ ] Evaluación rendida y corregida con rúbrica
- [ ] Calificación final y fecha en `progreso.json`

## 8. Lectura complementaria (L1)

- No bloquea avance.
- Se registra en `expediente/lecturas/` con formato libre.
- Cuenta para el expediente pero no para horas del módulo salvo anotación explícita.

## 9. Cobertura de carreras universitarias

- Actualizar `%` en `indice.md` al aprobar módulos que mapeen a carreras de referencia.
- Referencia: tabla en `diagnostico/clusters.md`.

## 10. Cierre de la licenciatura

Requisitos mínimos para considerar **Licenciatura completada** (Años 1–8):

- 48 módulos en estado `aprobado`
- Todos los módulos del plan cubiertos
- Expediente completo (evidencias de cada módulo)
- Módulo integrador M42 y cierre de Año 8 (M48) aprobados
