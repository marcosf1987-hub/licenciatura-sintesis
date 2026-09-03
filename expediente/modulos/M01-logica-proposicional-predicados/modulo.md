# M01 — Lógica Proposicional y de Predicados

## Qué vas a poder hacer

1. Formalizar argumentos (conectivos, tablas de verdad, tautologías).
2. Usar cuantificadores y predicados de primer orden.
3. Distinguir validez de solidez; reconocer falacias formales.
4. Leer a Frege (sentido y referencia) y el problema de la identidad.
5. Dejar base para filosofía del lenguaje (M10).

## Lecturas

Si no se indica un recorte, leé el texto entero.

### Obligatorio

| Qué | Cuánto | Dónde |
|---|---|---|
| [Classical Logic (SEP)](https://plato.stanford.edu/entries/logic-classical/) | Por unidad (mapa). No de una sentada. | Gratis |
| Frege, *On Sense and Reference* | Completo + [SEP Frege](https://plato.stanford.edu/entries/frege/) §2–3 | Gratis |

Priest y Ayer son opcionales: si no los conseguís, alcanza con la SEP.

### Mapa SEP ↔ unidad

| Unidad | Qué leer |
|---|---|
| U1 | §1–2 y el inicio de §3 (conectivos ¬ ∧ ∨) |
| U2 | §3 completo y §4.1 |
| U3 | §4.2–4.3 |
| U4 | §5 |
| U5 | §6 hasta cuantificadores |
| U6 | resto de §6; §7 (lo esencial); [Identity](https://plato.stanford.edu/entries/identity/) §1–2 |
| U7 | Frege completo + SEP Frege §2–3 |
| U8 | Repaso |

### Recomendado (libro entero)

*Introduction to Logic* (Copi / Hurley). Tiene sentido comprarlo si lo vas a leer de tapa a tapa.

## Unidades

Marcá cada una al terminar lecturas + práctica.

- [ ] **U1** — Validez, solidez, argumento
- [ ] **U2** — Conectivos y tablas de verdad
- [ ] **U3** — Equivalencias, formas normales, falacias
- [ ] **U4** — Deducción natural
- [ ] **U5** — Predicados I
- [ ] **U6** — Predicados II
- [ ] **U7** — Frege
- [ ] **U8** — Repaso y pedir evaluación
- [ ] Bibliografía obligatoria leída

## Detalle por unidad

*Guía de ~7,5 h por unidad. Ritmo libre.*

### U1 — Introducción: validez, solidez, argumento deductivo

**Objetivos**

- Distinguir argumento deductivo, inducción informal y mera explicación.
- Definir **validez** (si premisas verdaderas → conclusión verdadera) y **solidez** (válido + premisas verdaderas).
- Reconocer estructura premisa–conclusión en prosa; introducir letras proposicionales.

**Lecturas obligatorias**

| Fuente | Qué leer |
|---|---|
| [SEP — Classical Logic](https://plato.stanford.edu/entries/logic-classical/) | §1 *Introduction*; §2 *Arguments* (hasta validez/solidez) |
| Substituto Priest | SEP §3 *The Language of Propositional Logic* (solo conectivos básicos: ¬, ∧, ∨) |

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

| Fuente | Qué leer |
|---|---|
| SEP Classical Logic | §3 *The Language of Propositional Logic* (completo); §4.1 *Truth Functions* |
| Substituto Priest | Mismos temas vía SEP; opcional Copi/Hurley cap. 1–2 si tenés el libro |

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

| Fuente | Qué leer |
|---|---|
| SEP Classical Logic | §4.2 *Tautologies*; §4.3 *Normal Forms* (hasta CNF/DNF básico) |
| Substituto Ayer | SEP §4 + notas propias sobre “lógica y significado” (no hace falta el libro) |

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

| Fuente | Qué leer |
|---|---|
| SEP Classical Logic | §5 *Proof Theory* (intro + reglas proposicionales; no hace falta cálculo de secuentes completo) |
| Recomendado Copi/Hurley | Cap. sobre deducción natural (si tenés el libro) |

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

| Fuente | Qué leer |
|---|---|
| SEP Classical Logic | §6 *The Language of First-Order Logic* (hasta cuantificadores y fórmulas bien formadas) |
| Substituto Priest | SEP §6 + ejemplos propios de traducción |

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

| Fuente | Qué leer |
|---|---|
| SEP Classical Logic | §6 (resto: identidad, funciones si aparecen); §7 *Classical Logic* (semántica Tarski — lectura selectiva) |
| SEP — Identity | [Identity](https://plato.stanford.edu/entries/identity/) §1–2 (opcional pero útil) |

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

| Fuente | Qué leer |
|---|---|
| Frege — "On Sense and Reference" | Texto completo (trad. Geach & Black o similar online) |
| [SEP — Frege](https://plato.stanford.edu/entries/frege/) | §2 *The Argument for Sense*; §3 *The Sense and Reference of Names* |
| Substituto Ayer | SEP Frege + notas; extractos en archive.org solo si ya los tenés |

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
- Cerrar el módulo y pedir la evaluación.

**Repaso dirigido (~5 h)**

| Bloque | Actividad |
|---|---|
| Proposicional | 5 tablas + 3 derivaciones bajo tiempo (30 min c/u max) |
| Predicados | 8 traducciones mixtas + 2 contraejemplos ∃∀ |
| Frege | Releer tu resumen U7; preparar esquema ensayo 600–900 palabras |
| Integrador | 1 problema: formalizar argumento filosófico en FOL y comentar validez |

Cuando U1–U7, lecturas y un artefacto estén listos, pedí la evaluación al final de la página.

**Ensayo** — borrador antes de rendir:

> *“¿Por qué Frege necesitaba lógica formal?”* (600–900 palabras)  
> Debe citar o parafrasear Frege y conectar con al menos un tema de U1–U6 (validez, formalización, cuantificadores).

---

## Cómo te evalúan

Aprobado: **70%** o más. Cada parte pide al menos 50%.

| Parte | Peso | Qué es |
|---|---|---|
| Ejercicios | 45% | Tablas, formalización, predicados (~100 min) |
| Problema | 35% | Caso integrador + Frege o SEP |
| Ensayo | 20% | «¿Por qué Frege necesitaba lógica formal?» (600–900 palabras) |

Sigue a M10 (lenguaje), M11 (epistemología) y M32 (complejidad).
