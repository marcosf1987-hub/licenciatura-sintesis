# M01 — Lógica Proposicional y de Predicados

> **Estado:** `disponible` — Primer módulo del plan. Sin prerrequisitos.

## Metadatos

| Campo | Valor |
|---|---|
| **ID** | M01 |
| **Año** | 1 |
| **Track** | F — Filosofía · Lenguaje · Lógica |
| **Nivel** | L2→L3 |
| **Horas planificadas (orientativas)** | ~60 |
| **Horas plataforma (stats, opcional)** | 0 |
| **Estado** | `disponible` |
| **Prerrequisitos** | Ninguno |
| **Desbloquea** | M10, M11, M32 |

## Objetivos de aprendizaje

Al aprobar este módulo deberías poder:

1. Formalizar argumentos en lógica proposicional (conectivos, tablas de verdad, tautologías).
2. Trabajar con cuantificadores y predicados en lógica de primer orden.
3. Identificar validez y solidez de inferencias; reconocer falacias formales.
4. Leer textos introductorios de Frege y Russell con comprensión de su notación y problemas.
5. Aplicar lógica formal como prerrequisito de filosofía del lenguaje y sintaxis.

## Bibliografía

*Convención: si la columna **Alcance** no indica §, capítulos ni extractos, se asume **texto completo**.*

### Obligatoria

| # | Obra | Autor | Acceso | Alcance | Tier | Substituto |
|---|---|---|---|---|---|---|
| 1 | Classical Logic | — | https://plato.stanford.edu/entries/logic-classical/ | §1–7 distribuidos por U1–U6 (ver mapa; no leer entero de una vez) | A | — |
| 2 | *Logic: A Very Short Introduction* | Priest | Open Library / compra | **No leer** si usás substituto | C | SEP Classical Logic (mismas § que mapa) |
| 3 | "On Sense and Reference" | Frege | https://plato.stanford.edu/entries/frege/ + trad. Geach & Black | **Texto completo** | A | SEP Frege §2–3 |
| 4 | *Language, Truth and Logic* | Ayer | archive.org / compra | **No leer** si usás substituto | C | SEP Classical Logic §4 |

**Mapa lectura ↔ unidad (SEP Classical Logic)**

| Unidad | § a leer |
|---|---|
| U1 | §1–2; §3 (solo conectivos básicos) |
| U2 | §3 (completo); §4.1 |
| U3 | §4.2–4.3 |
| U4 | §5 |
| U5 | §6 (hasta cuantificadores) |
| U6 | §6 (resto); §7 (selectivo); SEP Identity §1–2 |
| U7 | Frege texto completo; SEP Frege §2–3 |
| U8 | Repaso §1–7 |

### Recomendada (compra sugerida si lectura integral)

| # | Obra | Autor | Alcance | Compra |
|---|---|---|---|---|
| 1 | *Introduction to Logic* | Copi / Hurley | **Texto completo** | **Compra sugerida** (archive.org si está disponible) |

### Complementaria (no bloquea)

| # | Obra | Autor | Notas |
|---|---|---|---|
| — | — | — | Reservado para profundización |

## Programa analítico

Marca cada unidad al completar **lecturas obligatorias + práctica mínima** de esa unidad (ver detalle abajo).

- [ ] **U1** — Introducción: validez, solidez, argumento deductivo
- [ ] **U2** — Lógica proposicional: conectivos y tablas de verdad
- [ ] **U3** — Equivalencias, tautologías, formas normales, falacias formales
- [ ] **U4** — Deducción natural proposicional (MP, MT, HS, DS)
- [ ] **U5** — Lógica de predicados I: cuantificadores, dominio, interpretación
- [ ] **U6** — Lógica de predicados II: relaciones, identidad, alcance
- [ ] **U7** — Aplicaciones filosóficas: Frege (sentido y referencia)
- [ ] **U8** — Repaso integral + solicitud de evaluación

---

## Programa detallado por unidad

*~7,5 h orientativas por unidad (~60 h total). Ritmo libre: podés comprimir o estirar. Las horas son guía, no requisito.*

### U1 — Introducción: validez, solidez, argumento deductivo

**Objetivos**

- Distinguir argumento deductivo, inducción informal y mera explicación.
- Definir **validez** (si premisas verdaderas → conclusión verdadera) y **solidez** (válido + premisas verdaderas).
- Reconocer estructura premisa–conclusión en prosa; introducir letras proposicionales.

**Lecturas obligatorias**

| Fuente | Qué leer | Tier |
|---|---|---|
| [SEP — Classical Logic](https://plato.stanford.edu/entries/logic-classical/) | §1 *Introduction*; §2 *Arguments* (hasta validez/solidez) | A |
| Substituto Priest | SEP §3 *The Language of Propositional Logic* (solo conectivos básicos: ¬, ∧, ∨) | A |

**Práctica mínima (~3 h)**

1. Identificar premisas y conclusión en **8 argumentos** de texto (periódico, ensayo, conversación inventada).
2. Clasificar cada uno: ¿deductivo o no? ¿válido o inválido? ¿sólido o no sólido? Justificar en 1–2 líneas.
3. Simbolizar **5 oraciones** simples con letras (P, Q, R…) y escribir 2 argumentos simbólicos de 2–3 premisas.

**Artefacto sugerido:** ficha `artefactos/u1-argumentos.md` con los 8 casos analizados.

**Autocontrol**

- ¿Podés dar un argumento válido con premisa falsa?
- ¿Podés dar un argumento inválido con conclusión verdadera?
- ¿Por qué la validez no garantiza la verdad de la conclusión?

---

### U2 — Conectivos y tablas de verdad

**Objetivos**

- Dominar ¬, ∧, ∨, →, ↔ y su lectura en español (incluida la condicional material).
- Construir tablas de verdad para fórmulas de hasta 3–4 letras.
- Detectar contigencia, tautología y contradicción en tablas.

**Lecturas obligatorias**

| Fuente | Qué leer | Tier |
|---|---|---|
| SEP Classical Logic | §3 *The Language of Propositional Logic* (completo); §4.1 *Truth Functions* | A |
| Substituto Priest | Mismos temas vía SEP; opcional Copi/Hurley cap. 1–2 si tenés el libro | A/C |

**Práctica mínima (~4 h)**

1. Tablas de verdad completas para: `(P → Q) ∧ ¬Q`, `(P ∨ Q) → P`, `¬(P ↔ Q)`.
2. **12 ejercicios** de valor de verdad: dada una fila de la tabla, completar el resto o decidir si la fórmula es tautología/contradicción/contingente.
3. Traducir **10 oraciones** al lenguaje proposicional (incluir al menos 3 condicionales y 2 bicondicionales).

**Artefacto sugerido:** `artefactos/u2-tablas-verdad.pdf` o `.md` con 6 tablas bien hechas.

**Autocontrol**

- ¿Cuándo `P → Q` es falsa?
- ¿`P → Q` equivale a `¬Q → ¬P`? Verificar con tabla.
- ¿Por qué “si… entonces” en español no siempre es condicional material?

---

### U3 — Equivalencias, tautologías, formas normales, falacias formales

**Objetivos**

- Aplicar equivalencias clave: De Morgan, distributividad, contraposición, exportación.
- Obtener formas normales (CNF/DNF) en casos simples.
- Reconocer falacias formales: afirmación del consecuente, negación del antecedente, etc.

**Lecturas obligatorias**

| Fuente | Qué leer | Tier |
|---|---|---|
| SEP Classical Logic | §4.2 *Tautologies*; §4.3 *Normal Forms* (hasta CNF/DNF básico) | A |
| Substituto Ayer | SEP §4 + notas propias sobre “lógica y significado” (no hace falta el libro) | A |

**Práctica mínima (~4 h)**

1. Simplificar **8 fórmulas** con equivalencias (mostrar pasos).
2. Convertir **4 fórmulas** a CNF y **2** a DNF.
3. Identificar la falacia en **6 argumentos** inválidos clásicos (esquema + contraejemplo en tabla o fila).

**Artefacto sugerido:** mapa conceptual `artefactos/u3-equivalencias.md` (De Morgan, contraposición, falacias).

**Autocontrol**

- Escribir una tautología que no sea solo `P ∨ ¬P`.
- Dar contraejemplo tabular de “si no llueve, no moja → llovió porque moja” mal formalizado.

---

### U4 — Deducción natural proposicional

**Objetivos**

- Derivar conclusiones con reglas básicas: **MP** (modus ponens), **MT**, **HS**, **DS**, **Conjunción/Disyunción**, **Negación**, **Condicional** (suposición y descarga).
- Distinguir derivabilidad (⊢) de validez semántica (⊨) a nivel intuitivo.
- Leer pruebas en formato de líneas numeradas.

**Lecturas obligatorias**

| Fuente | Qué leer | Tier |
|---|---|---|
| SEP Classical Logic | §5 *Proof Theory* (intro + reglas proposicionales; no hace falta cálculo de secuentes completo) | A |
| Recomendado Copi/Hurley | Cap. sobre deducción natural (si tenés el libro) | compra sugerida |

**Práctica mínima (~5 h)**

1. Completar **10 derivaciones** guiadas (premisas dadas → conclusión).
2. **5 derivaciones** sin guía, incluyendo al menos 1 con suposición condicional.
3. Para 2 pruebas, verificar validez con tabla de verdad y comparar con la derivación.

**Artefacto sugerido:** `artefactos/u4-derivaciones.md` con 5 pruebas completas comentadas.

**Autocontrol**

- ¿Toda tautología es demostrable en deducción natural clásica? (respuesta esperada: sí — solo intuición aquí).
- Derivar `P → P` en ≤ 3 pasos.

---

### U5 — Lógica de predicados I: cuantificadores y dominio

**Objetivos**

- Leer fórmulas con ∀, ∃, predicados unarios y binarios simples.
- Formalizar enunciados con “todos”, “algunos”, “ningún”, “exactamente uno” (intro).
- Entender **dominio de cuantificación** e **interpretación** (modelo mínimo).

**Lecturas obligatorias**

| Fuente | Qué leer | Tier |
|---|---|---|
| SEP Classical Logic | §6 *The Language of First-Order Logic* (hasta cuantificadores y fórmulas bien formadas) | A |
| Substituto Priest | SEP §6 + ejemplos propios de traducción | A |

**Práctica mínima (~4 h)**

1. Traducir **15 oraciones** al lenguaje de primer orden (sin identidad aún): universos explícitos (personas, números, libros…).
2. Dado un dominio de 3 elementos, evaluar **4 fórmulas** ∀/∃ a mano (enumeración).
3. Distinguir alcance en **5 fórmulas** ambiguas mal parentizadas vs bien parentizadas.

**Artefacto sugerido:** `artefactos/u5-traducciones-fol.md` con las 15 traducciones y glosario de predicados.

**Autocontrol**

- Formalizar: “Nadie lee todos los libros” (dos lecturas si cambia alcance — discutir).
- ¿`∀x P(x) → Q` vs `∀x (P(x) → Q)`? Contraejemplo.

---

### U6 — Lógica de predicados II: relaciones, identidad, alcance

**Objetivos**

- Usar **identidad** (=) y **relaciones** (Rxy, padre de, mayor que).
- Manejar **orden de cuantificadores** (∀∃ vs ∃∀).
- Formalizar argumentos de 3–4 premisas en FOL.

**Lecturas obligatorias**

| Fuente | Qué leer | Tier |
|---|---|---|
| SEP Classical Logic | §6 (resto: identidad, funciones si aparecen); §7 *Classical Logic* (semántica Tarski — lectura selectiva) | A |
| SEP — Identity | [Identity](https://plato.stanford.edu/entries/identity/) §1–2 (opcional pero útil) | A |

**Práctica mínima (~4 h)**

1. Traducir **10 oraciones** con identidad y relaciones.
2. **6 argumentos** en FOL; indicar si son válidos (intuición + contraejemplo en mini-dominio).
3. **4 pares** de fórmulas: ¿equivalentes? (∀∃ vs ∃∀ — mostrar contraejemplo cuando no).

**Artefacto sugerido:** `artefactos/u6-fol-integrador.md` (mini-problema: “todos los filósofos leen algún libro que ningún crítico lee” — formalizar y discutir).

**Autocontrol**

- Formalizar “Hay exactamente dos cosas” con = y cuantificadores.
- Contraejemplo para “Todo mundo ama a alguien → Alguien es amado por todos”.

---

### U7 — Frege: sentido, referencia y por qué importa la lógica formal

**Objetivos**

- Explicar el **puzzle de identidad** (a = a vs a = b informativo).
- Distinguir **Sinn** y **Bedeutung** en oraciones, nombres y oraciones completas.
- Conectar lógica formal con filosofía del lenguaje (puente hacia M10).

**Lecturas obligatorias**

| Fuente | Qué leer | Tier |
|---|---|---|
| Frege — "On Sense and Reference" | Texto completo (trad. Geach & Black o similar online) | A |
| [SEP — Frege](https://plato.stanford.edu/entries/frege/) | §2 *The Argument for Sense*; §3 *The Sense and Reference of Names* | A |
| Substituto Ayer | SEP Frege + notas; extractos en archive.org solo si ya los tenés | A/C |

**Práctica mínima (~3 h)**

1. Resumen estructurado (1–2 páginas): tesis central, 3 ejemplos (Estrella del Alba/Venus, “Hespero es Fosforo”, oraciones).
2. **3 preguntas** de aplicación: sustitutividad salva veritate, oraciones indirectas, referencia de oraciones (verdadero/falso).
3. Bosquejo del ensayo de evaluación (§ abajo): 5 bullets “¿Por qué Frege necesitaba lógica formal?”

**Artefacto sugerido:** `artefactos/u7-frege-resumen.md` (base del ensayo final).

**Autocontrol**

- ¿Por qué el mismo referente puede dar distinto valor cognoscitivo?
- ¿La lógica proposicional basta para el puzzle de identidad? Argumentar.

---

### U8 — Repaso integral y evaluación

**Objetivos**

- Cerrar lagunas; unificar proposicional + predicados + Frege.
- Verificar checklist de gates; pasar a estado `evaluacion`.

**Repaso dirigido (~5 h)**

| Bloque | Actividad |
|---|---|
| Proposicional | 5 tablas + 3 derivaciones bajo tiempo (30 min c/u max) |
| Predicados | 8 traducciones mixtas + 2 contraejemplos ∃∀ |
| Frege | Releer tu resumen U7; preparar esquema ensayo 600–900 palabras |
| Integrador | 1 problema: formalizar argumento filosófico en FOL y comentar validez |

**Checklist antes de evaluar**

- [ ] U1–U7 marcadas (≥ 90% del programa = al menos 7/8 unidades)
- [ ] Bibliografía obligatoria leída (SEP Classical Logic completo o equivalente por unidades)
- [ ] Frege leído
- [ ] ≥ 1 artefacto en `artefactos/` (ideal: 3+ entre U1–U7)
- [ ] Estado en `progreso.json`: `evaluacion`

**Ensayo (20% de la nota)** — preparar borrador antes de rendir:

> *“¿Por qué Frege necesitaba lógica formal?”* (600–900 palabras)  
> Debe citar o parafrasear Frege y conectar con al menos un tema de U1–U6 (validez, formalización, cuantificadores).

---

## Cronograma sugerido (~8 unidades)

*Orientativo. Podés acelerar, pausar o ignorar el calendario.*

| Unidad | Contenido | Horas ref. | Hecho |
|---|---|---|---|
| U1 | Validez, solidez, argumento, simbolización básica | ~7,5 | [ ] |
| U2 | Tablas de verdad, conectivos | ~7,5 | [ ] |
| U3 | Equivalencias, CNF/DNF, falacias formales | ~7,5 | [ ] |
| U4 | Deducción natural | ~7,5 | [ ] |
| U5 | Cuantificadores, dominio, traducción FOL | ~7,5 | [ ] |
| U6 | Relaciones, identidad, orden de cuantificadores | ~7,5 | [ ] |
| U7 | Frege: sentido y referencia | ~7,5 | [ ] |
| U8 | Repaso + evaluación | ~7,5 | [ ] |

## Evidencias (obligatorias para evaluar)

- [ ] Programa ≥ 90% marcado (checkboxes arriba)
- [ ] Bibliografía obligatoria leída
- [ ] ≥ 1 artefacto en `artefactos/` (mapa conceptual, ejercicios, notas)
- [ ] Evaluación rendida (`evaluaciones/`)
- [ ] Actualización de `../progreso.json`

## Evidencias opcionales

- [ ] Registros en `notas/` (sin formato fijo)
- [ ] Horas en webapp (automático, solo estadísticas)

## Evaluación (L2→L3)

Protocolo: `config/protocolo_evaluacion.md` §4.4

| Componente | Peso | Tiempo | Piso |
|---|---|---|---|
| Quiz + ejercicios formales (tablas de verdad, formalización, predicados) | 45% | 100 min | 50% |
| Aplicación / problema integrador | 35% | incluido | 50% |
| Síntesis: "¿Por qué Frege necesitaba lógica formal?" (600–900 palabras) | 20% | plazo 60 h | 50% |
| **Total** | 100% | | **≥70%** |

### Contenido esperado por componente

| Parte | Qué evalúa | Temas U1–U7 |
|---|---|---|
| Quiz 45% | Tablas, formalización PL/FOL, validez, equivalencias | U1–U6 |
| Aplicación 35% | Problema integrador + mini-análisis de fuente (Frege o SEP) | U5–U7 |
| Síntesis 20% | Ensayo argumentativo con cita a bibliografía | U7 |

Plantilla de evaluación: `templates/evaluacion.md` · Rúbrica: `config/rubricas/resumen_escalas.md` § L2→L3

## Conexiones

- **Familias:** 8 (Filosofía), 9 (Lingüística), 11 (Formal)
- **Carreras ref:** Filosofía, Lingüística, Ciencias de la Computación
- **Módulos relacionados:** M10 (Fil. del lenguaje), M11 (Epistemología), M32 (Complejidad)

## Estructura de carpetas del módulo

```
M01-logica-proposicional-predicados/
├── modulo.md          ← Este archivo
├── artefactos/        ← Ejercicios, mapas, resúmenes (≥1 obligatorio)
├── evaluaciones/      ← intento-1.md, intento-2.md…
└── notas/             ← Opcional, sin formato fijo
```
