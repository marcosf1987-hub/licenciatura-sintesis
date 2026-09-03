# M01 — Lógica Proposicional y de Predicados

## Qué vas a poder hacer

1. Formalizar argumentos (conectivos, tablas de verdad, tautologías).
2. Usar cuantificadores y predicados de primer orden.
3. Distinguir validez de solidez; reconocer falacias formales.
4. Leer a Frege (sentido y referencia) y el problema de la identidad.
5. Dejar base para filosofía del lenguaje (M10).

## Bibliografía obligatoria

| Obra | Alcance | Enlace |
|---|---|---|
| Classical Logic (Stanford Encyclopedia of Philosophy) | Ver indicación en cada unidad | [Abrir](https://plato.stanford.edu/entries/logic-classical/) |
| Frege, «On Sense and Reference» | Texto completo | [Abrir (SEP Frege)](https://plato.stanford.edu/entries/frege/) |
| Frege (Stanford Encyclopedia of Philosophy) | Secciones 2–3 | [Abrir](https://plato.stanford.edu/entries/frege/) |

## Lecturas por unidad

*(§ = sección / apartado del artículo, no capítulo de un libro.)*

| Unidad | Qué leer en Classical Logic (SEP) u otras fuentes |
|---|---|
| U1 | Secciones 1–2 y el inicio de la 3 (conectivos ¬ ∧ ∨) |
| U2 | Sección 3 completa y 4.1 |
| U3 | Secciones 4.2–4.3 |
| U4 | Sección 5 |
| U5 | Sección 6 hasta cuantificadores |
| U6 | Resto de la sección 6; sección 7 (lo esencial); [Identity](https://plato.stanford.edu/entries/identity/) secciones 1–2 |
| U7 | Frege (texto completo) + SEP Frege secciones 2–3 |
| U8 | Repaso |

## Bibliografía complementaria

| Obra | Autor |
|---|---|
| *Introduction to Logic* | Copi / Hurley |

## Detalle por unidad

*Guía de ~7,5 h por unidad. Ritmo libre.*

### U1 — Introducción: validez, solidez, argumento deductivo

**Objetivos**

- Distinguir argumento deductivo, inducción informal y mera explicación.
- Definir **validez** (si premisas verdaderas → conclusión verdadera) y **solidez** (válido + premisas verdaderas).
- Reconocer estructura premisa–conclusión en prosa; introducir letras proposicionales.

**Lecturas**

| Obra | Qué leer | Enlace |
|---|---|---|
| Classical Logic (SEP) | Secciones 1–2; inicio de la 3 (conectivos ¬ ∧ ∨) | [Abrir](https://plato.stanford.edu/entries/logic-classical/) |

- [ ] Lecturas de esta unidad

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

**Lecturas**

| Obra | Qué leer | Enlace |
|---|---|---|
| Classical Logic (SEP) | Sección 3 completa; sección 4.1 | [Abrir](https://plato.stanford.edu/entries/logic-classical/) |

- [ ] Lecturas de esta unidad

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

**Lecturas**

| Obra | Qué leer | Enlace |
|---|---|---|
| Classical Logic (SEP) | Secciones 4.2–4.3 (hasta CNF/DNF básico) | [Abrir](https://plato.stanford.edu/entries/logic-classical/) |

- [ ] Lecturas de esta unidad

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

**Lecturas**

| Obra | Qué leer | Enlace |
|---|---|---|
| Classical Logic (SEP) | Sección 5 (intro + reglas proposicionales) | [Abrir](https://plato.stanford.edu/entries/logic-classical/) |

- [ ] Lecturas de esta unidad

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

**Lecturas**

| Obra | Qué leer | Enlace |
|---|---|---|
| Classical Logic (SEP) | Sección 6 hasta cuantificadores y fórmulas bien formadas | [Abrir](https://plato.stanford.edu/entries/logic-classical/) |

- [ ] Lecturas de esta unidad

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

**Lecturas**

| Obra | Qué leer | Enlace |
|---|---|---|
| Classical Logic (SEP) | Resto de la sección 6; sección 7 (lectura selectiva) | [Abrir](https://plato.stanford.edu/entries/logic-classical/) |
| Identity (SEP) | Secciones 1–2 | [Abrir](https://plato.stanford.edu/entries/identity/) |

- [ ] Lecturas de esta unidad

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

**Lecturas**

| Obra | Qué leer | Enlace |
|---|---|---|
| Frege, «On Sense and Reference» | Texto completo | [Abrir (SEP Frege)](https://plato.stanford.edu/entries/frege/) |
| Frege (SEP) | Secciones 2–3 | [Abrir](https://plato.stanford.edu/entries/frege/) |

- [ ] Lecturas de esta unidad

**Práctica mínima (~3 h)**

1. Resumen estructurado (1–2 páginas): tesis central, 3 ejemplos (Estrella del Alba/Venus, “Hespero es Fosforo”, oraciones).
2. **3 preguntas** de aplicación: sustitutividad salva veritate, oraciones indirectas, referencia de oraciones (verdadero/falso).
3. Bosquejo del ensayo: 5 bullets “¿Por qué Frege necesitaba lógica formal?”

**Artefacto sugerido:** `artefactos/u7-frege-resumen.md` (base del ensayo final).

**Autocontrol**

- ¿Por qué el mismo referente puede dar distinto valor cognoscitivo?
- ¿La lógica proposicional basta para el puzzle de identidad? Argumentar.

---

### U8 — Repaso integral y evaluación

**Objetivos**

- Cerrar lagunas; unificar proposicional + predicados + Frege.
- Cerrar el módulo y pedir la evaluación.

**Lecturas**

Repaso de las secciones ya vistas en U1–U7 (Classical Logic + Frege).

- [ ] Lecturas de esta unidad

**Repaso dirigido (~5 h)**

| Bloque | Actividad |
|---|---|
| Proposicional | 5 tablas + 3 derivaciones bajo tiempo (30 min c/u max) |
| Predicados | 8 traducciones mixtas + 2 contraejemplos ∃∀ |
| Frege | Releer tu resumen U7; preparar esquema del ensayo |
| Integrador | 1 problema: formalizar argumento filosófico en FOL y comentar validez |

**Ensayo** — borrador antes de rendir:

> *“¿Por qué Frege necesitaba lógica formal?”* (600–900 palabras)  
> Debe citar o parafrasear Frege y conectar con al menos un tema de U1–U6 (validez, formalización, cuantificadores).

### Criterio de evaluación

Aprobado: **70%** o más. Cada parte pide al menos 50%.

| Parte | Peso | Qué es |
|---|---|---|
| Ejercicios | 45% | Tablas, formalización, predicados (~100 min) |
| Problema | 35% | Caso integrador + Frege o SEP |
| Ensayo | 20% | «¿Por qué Frege necesitaba lógica formal?» (600–900 palabras) |

Sigue a M10 (lenguaje), M11 (epistemología) y M32 (complejidad).
