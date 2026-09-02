# Protocolo de evaluación — Agente Evaluador

> Versión 1.0 · Complementa `reglas_progresion.md` con procedimiento operativo detallado.

---

## 1. Rol del Agente Evaluador

El **Agente Evaluador** es independiente del Counselor y del Director Académico. Su función:

1. Verificar que el módulo cumple **evidencias previas** antes de evaluar.
2. **Generar** la instancia de examen (preguntas originales, alineadas al programa del módulo).
3. **Corregir** con rúbrica explícita y criterios públicos.
4. **Registrar** resultado en el expediente y prescribir cambio de método si hay reprobación.
5. **No** rediseñar el plan ni bajar el nivel del módulo.

Principio rector: **exigencia real, asincronía total, cero teatro**. Aprobar significa dominar ~60–70% de lo que exigiría una materia universitaria equivalente.

Instrucciones del agente: `config/agente_evaluador.md`.

---

## 2. Precondiciones (gate previo a evaluar)

> Ritmo libre: sin horas ni semanas obligatorias. Ver `config/modelo_estudio.md`.

El evaluador **rechaza** iniciar la evaluación si falta alguno:

| # | Evidencia | Dónde verificar |
|---|---|---|
| 1 | Estado del módulo = `evaluacion` | `progreso.json` |
| 2 | Programa analítico ≥ 90% marcado | `modulo.md` o webapp |
| 3 | Bibliografía obligatoria declarada leída | `modulo.md` |
| 4 | ≥ 1 artefacto de estudio (notas, mapa, ejercicios) | `artefactos/` o carpeta del módulo |

**No se verifica:** horas registradas, archivos semanales, tiempo mínimo de calendario, login en plataforma.

Si falta evidencia: devolver a `en_curso` con lista concreta de pendientes.

---

## 3. Tipos de evaluación por nivel

| Nivel del módulo | Formato | Umbral global | Piso por componente | Tiempo |
|---|---|---|---|---|
| **L1** | Quiz + ficha | 60% | — | 30 min |
| **L2** | Quiz + aplicación + mapa/ensayo corto | 70% | 50% | 90 min + 48 h ensayo |
| **L3** | Conceptual + aplicación + síntesis | 70% | 50% | 120 min + 72 h ensayo |
| **L2→L3** (transición) | Mixto según §4.4 | 70% | 50% | 100 min + 60 h ensayo |

**Regla de piso:** si algún componente < 50%, el módulo se considera **reprobado** aunque la media ponderada ≥ 70%.

---

## 4. Formatos detallados

### 4.1 Evaluación L1 (lecturas complementarias)

**Cuándo:** `expediente/lecturas/`, sin bloqueo de módulos.

**Componentes:**

| Parte | Peso | Contenido |
|---|---|---|
| Quiz | 60% | 10 preguntas: 6 opción múltiple + 4 respuesta breve (1–3 líneas) |
| Ficha de lectura | 40% | Resumen 150–250 palabras + 3 ideas clave + 1 conexión con el plan |

**Generación del quiz:**
- Basado en la fuente declarada por el estudiante.
- Preguntas de comprensión, no trivia memorística.
- Al menos 2 preguntas que exijan relacionar ideas.

**Aprobación:** ≥ 60%. Se archiva en `lecturas/`; no actualiza `progreso.json` de módulos.

---

### 4.2 Evaluación L2 (módulos orientados)

**Componentes:**

| Parte | Peso | Tiempo | Descripción |
|---|---|---|---|
| **A. Quiz conceptual** | 40% | 45 min | 20 ítems: 12 MC + 8 breves. Cubrir todo el programa. |
| **B. Aplicación** | 40% | 45 min | 1 caso, problema o ejercicio integrador. Respuesta 300–600 palabras o equivalente formal (cálculos, diagramas). |
| **C. Mapa conceptual o micro-ensayo** | 20% | 48 h | Mapa con ≥ 12 nodos y relaciones etiquetadas **o** ensayo 400–600 palabras sobre un tema del programa. |

**Criterios de generación (Parte A):**
- Distribución uniforme por unidades del programa (mín. 2 preguntas por unidad).
- 30% de preguntas que exijan **aplicar**, no solo definir.
- Prohibido reutilizar preguntas de intentos anteriores del mismo módulo.

**Rúbrica Parte B (aplicación):**

| Criterio | Excelente (4) | Suficiente (2) | Insuficiente (0) |
|---|---|---|---|
| Comprensión del enunciado | Reformula correctamente | Parcial | Errónea |
| Uso de conceptos del módulo | Preciso y pertinente | Algunos errores | Ausente o incorrecto |
| Desarrollo / solución | Completo y coherente | Incompleto | Irrelevante |
| Rigor (terminología, lógica) | Consistente | Fluctuante | Caótico |

Puntuación Parte B = (suma criterios / 16) × peso del componente.

**Rúbrica Parte C (mapa o micro-ensayo):**

| Criterio | Puntos |
|---|---|
| Cobertura del tema central | 0–4 |
| Relaciones / argumento no lineal | 0–4 |
| Precisión conceptual | 0–4 |
| Claridad expositiva | 0–4 |

---

### 4.3 Evaluación L3 (profundidad universitaria)

**Componentes:**

| Parte | Peso | Tiempo | Descripción |
|---|---|---|---|
| **A. Examen conceptual** | 50% | 120 min | 4–6 preguntas de **desarrollo** (150–400 palabras c/u). Sin consulta. |
| **B. Aplicación / análisis de fuente** | 30% | Incluido en sesión o +60 min | Análisis de texto primario, caso complejo, o problema multi-paso. |
| **C. Síntesis** | 20% | 72 h | Ensayo 800–1200 palabras con tesis, bibliografía del módulo y al menos 1 cita o referencia precisa. |

**Distribución Parte A (obligatoria):**
- 1 pregunta de definición/concepto central
- 1 pregunta de comparación entre autores o escuelas
- 1 pregunta de crítica o limitación de una teoría
- 1 pregunta de aplicación a un fenómeno concreto
- (Opcional 5.ª y 6.ª) profundización técnica

**Parte B — dos modalidades (el evaluador elige según el módulo):**

| Modalidad | Tracks típicos | Consigna |
|---|---|---|
| **Análisis de fuente** | F, M, S, H | Fragmento de 1–3 páginas (Frege, Freud, Weber…). Identificar tesis, argumento, objeción posible. |
| **Problema aplicado** | T, V, X | Ejercicio que requiera procedimiento (estratigrafía, lógica, ecología, algoritmo). |
| **Caso integrador** | S, M, H | Escenario real o histórico que exija varios conceptos del módulo. |

**Rúbrica Parte A (cada pregunta, escala 0–10):**

| Puntos | Descripción |
|---|---|
| 9–10 | Respuesta completa, precisa, con matices; evidencia comprensión profunda |
| 7–8 | Correcta con omisiones menores |
| 5–6 | Parcialmente correcta; confusiones conceptuales |
| 3–4 | Superficial o con errores graves |
| 0–2 | Incorrecta, irrelevante o vacía |

**Rúbrica Parte C (ensayo):**

| Criterio | Peso interno |
|---|---|
| Tesis clara y defendible | 25% |
| Estructura (introducción, desarrollo, cierre) | 20% |
| Dominio de bibliografía obligatoria | 25% |
| Argumentación y uso de conceptos del módulo | 20% |
| Originalidad analítica (no mero resumen) | 10% |

---

### 4.4 Evaluación L2→L3 (módulos de transición, ej. M01, M13)

Para módulos marcados `L2-L3` o `L1-L2`:

| Parte | Peso | Formato |
|---|---|---|
| Quiz + ejercicios formales | 45% | L2: ítems técnicos (tablas de verdad, formalización, cálculos) |
| Aplicación / problema | 35% | L3: problema integrador o mini-análisis de fuente |
| Síntesis escrita | 20% | Ensayo 600–900 palabras (intermedio entre L2 y L3) |

Umbral: 70% global, piso 50% por componente.

---

### 4.5 Módulo integrador M42 (cierre de carrera)

Evaluación **obligatoriamente integradora**:

| Parte | Peso | Contenido |
|---|---|---|
| Examen transversal | 40% | Preguntas que crucen ≥ 3 familias del plan (ej. folclor + epistemología + psicopatología) |
| Proyecto de síntesis | 40% | Trabajo elegido entre: dossier analítico, ensayo largo (2000 palabras), o estudio de caso original |
| Autobiografía intelectual | 20% | Texto 500–800 palabras: qué cambió en tu modelo del mundo tras los 8 años del programa |

---

## 5. Anti-autoengaño y integridad

| Medida | Implementación |
|---|---|
| **Preguntas generadas al momento** | El evaluador crea la instancia al iniciar; no usa bancos fijos |
| **Variación entre intentos** | Intento 2: ≥ 70% preguntas nuevas. Intento 3: 100% nuevas + formato distinto si es posible |
| **Justificación obligatoria (L3)** | Al menos 1 pregunta exige citar o parafrasear un autor de la bibliografía obligatoria |
| **Preguntas trampa de comprensión** | Incluir 1 ítem que falle si el estudiante solo memorizó definiciones sin entender |
| **Límite de tiempo declarado** | El estudiante registra hora de inicio/fin en `evaluaciones/intento-N.md` |
| **Sin consulta en Parte A (L3)** | Bibliografía cerrada; solo memoria y razonamiento |
| **Detección de respuesta genérica** | El evaluador penaliza definiciones de manual sin aplicación (-2 puntos por pregunta) |
| **Prohibido copiar-pegar** de IA en evaluación | Honor system + preguntas que exijan referencia a lecturas específicas del módulo |

---

## 6. Procedimiento de sesión de evaluación

```
PASO 1 — Solicitud
  Estudiante indica: módulo listo, evidencias completas.

PASO 2 — Verificación (Evaluador)
  Checklist §2. Si falla → lista de pendientes.

PASO 3 — Generación
  Evaluador publica Partes A y B (y consigna de C con plazo).
  Registra hash/fecha de instancia en evaluacion.md.

PASO 4 — Rendición (Estudiante)
  Completa respuestas en evaluaciones/intento-N.md.
  Registra tiempos. Entrega Parte C antes del plazo.

PASO 5 — Corrección (Evaluador)
  Aplica rúbricas. Completa tablas de puntos.
  Calcula nota final. Emite veredicto.

PASO 6 — Registro
  Si aprobado: progreso.json, indice.md, archivo en expediente/evaluaciones/.
  Si reprobado: protocolo §7.
```

---

## 7. Reprobación y cambio de método

### 7.1 Cálculo de resultado

```
Nota_final = Σ (componente_i × peso_i)

Aprobado  si: Nota_final ≥ 70 AND cada componente ≥ 50
Reprobado si: Nota_final < 70 OR algún componente < 50
```

### 7.2 Por intento

| Intento | Plazo mínimo antes de reintento | Cambio de método obligatorio |
|---|---|---|
| **1 → 2** | 7 días | Diagnóstico escrito de fallas + repaso focalizado de unidades débiles (el evaluador indica cuáles) |
| **2 → 3** | 15 días | Bibliografía alternativa (≥ 1 fuente nueva) + ejercicios tipo distintos + mini-tutoría con enfoque diferente |
| **3 → revisión** | — | Escalada al Director Académico: reformular evaluación, no bajar nivel |

### 7.3 Prescripción de cambio de método (plantilla)

El evaluador **debe** incluir en la retroalimentación:

```markdown
## Prescripción post-reprobación

- Unidades débiles: [lista]
- Errores conceptuales recurrentes: [lista]
- Bibliografía alternativa: [1–2 obras o capítulos]
- Ejercicios recomendados: [tipo concreto]
- Enfoque distinto: [ej. "menos definiciones, más problemas aplicados"]
- Fecha earliest reintento: YYYY-MM-DD
```

---

## 8. Registro en el expediente

### 8.1 Archivos a crear/actualizar al aprobar

| Archivo | Campos |
|---|---|
| `modulos/MXX/evaluaciones/intento-N.md` | Evaluación completa corregida |
| `expediente/evaluaciones/MXX-intento-N-APROBADO.md` | Copia archivada |
| `progreso.json` | `estado: aprobado`, `calificacion`, `fecha_aprobacion`, `intentos_evaluacion` |
| `progreso.json` (global) | `modulos_aprobados++`, `horas_acumuladas+=60`, recalcular promedio |
| `indice.md` | Historial, módulo activo, cobertura carreras |
| `modulo.md` | Nota final, fecha, checklist evidencias marcado |

### 8.2 Desbloqueo del siguiente módulo

Tras aprobar MXX:

1. Marcar M(X+1) como `disponible` si no tiene otros prerrequisitos pendientes.
2. Para cada módulo con prerrequisito MXX: verificar si **todos** sus prerrequisitos están `aprobados`; si sí → `disponible`.

---

## 9. Escala de calificación verbal

| Nota numérica | Calificación | Significado |
|---|---|---|
| 90–100 | Sobresaliente | Dominio sólido; supera el estándar ~60% universitario |
| 80–89 | Muy bueno | Dominio claro; listo para módulos dependientes |
| 70–79 | Aprobado | Umbral mínimo; conviene reforzar puntos débiles |
| 60–69 | Insuficiente | Reprobado |
| < 60 | Deficiente | Reprobado; lagunas importantes |

---

## 10. Adaptaciones por track (orientación al evaluador)

| Track | Énfasis en evaluación | Evitar |
|---|---|---|
| **T** (Tierra) | Procesos, correlación temporal, interpretación de datos | Solo definiciones de vocabulario |
| **V** (Vida) | Mecanismos evolutivos/ecológicos, relaciones causa-efecto | Taxonomía memorística sin función |
| **M** (Mente) | Conceptos clínicos/teóricos, casos, distinción de escuelas | Opinión personal sin marco teórico |
| **F** (Filosofía/Lengua) | Argumento, texto primario, distinciones finas | Resumen de manual |
| **S** (Sociedad) | Análisis de poder, instituciones, retórica | Cronología vacía |
| **X** (Formal) | Demostración, procedimiento, formalización | Hand-waving conceptual |
| **H** (Umbral) | Análisis cultural crítico del fenómeno; no validar lo paranormal | Tratar creencias como hechos empíricos |

**Regla Familia 13 (folclor/pseudociencias):** evaluar capacidad de **explicar por qué** persisten las creencias y qué evidencia falta; penalizar afirmaciones sin distinción emic/etic.

---

## 11. Checklist del evaluador (post-corrección)

- [ ] Todas las preguntas tienen puntaje asignado
- [ ] Pesos suman 100%
- [ ] Piso por componente verificado
- [ ] Retroalimentación específica (no genérica)
- [ ] Si reprobó: prescripción §7.3 completa
- [ ] Archivos del expediente actualizados
- [ ] Siguiente módulo desbloqueado si corresponde

---

## 12. Documentos relacionados

| Archivo | Contenido |
|---|---|
| `config/agente_evaluador.md` | Prompt e instrucciones del agente |
| `config/rubricas/resumen_escalas.md` | Tablas rápidas de puntuación |
| `config/reglas_progresion.md` | Reglas generales |
| `templates/evaluacion.md` | Plantilla de instancia |

---

*Protocolo cerrado v1.0 — listo para operar con M01.*
