# Política de bibliografía — Acceso digital y alternativas

> Versión 1.1 · Aplica a todos los módulos al definir bibliografía obligatoria.

---

## Principio

**Ningún módulo puede depender exclusivamente de libros de pago inaccesibles.**

La formación no se detiene por demoras de compra, envío o presupuesto. Cada texto obligatorio debe tener **acceso garantizado en formato digital o equivalente libre** antes de cerrar la bibliografía del módulo.

**Comprar tiene sentido cuando el libro es fundacional y conviene leerlo entero** — no cuando solo hace falta un capítulo suelto.

---

## Tres niveles de bibliografía

| Nivel | Bloquea evaluación | Compra |
|---|---|---|
| **Obligatoria** | Sí | No requerida; Tier A/B o substituto digital |
| **Recomendada** | No | **Compra sugerida** si el libro es fundacional y vale leerlo completo |
| **Complementaria** | No | Opcional; aspiracional o profundización |

### Cuándo recomendar compra

| Caso | Dónde va | Acción |
|---|---|---|
| Libro fundacional del módulo o del track; conviene leerlo **entero** | **Recomendada** + etiqueta `compra sugerida` | Tiene sentido adquirirlo cuando el presupuesto lo permita |
| Solo hace falta **1–2 capítulos** de un libro largo | **Obligatoria** vía substituto A/B (paper, SEP, archive.org, OCW) | **No recomendar compra** del libro entero |
| Libro caro sin sustituto y sin lectura integral justificada | No puede ser obligatoria | Tier D → complementaria o descartar |

**Regla práctica:** si la lectura útil es parcial, la obligatoria apunta al capítulo/paper digital; el libro completo, si existe, va en recomendada solo cuando la lectura integral aporta valor real al módulo o a la carrera.

## Clasificación de fuentes

| Tier | Tipo | Ejemplos | Uso en bibliografía |
|---|---|---|---|
| **A** | Gratis online, legal | Stanford Encyclopedia of Philosophy, MIT OCW, OpenStax, PubMed Central, arXiv, repositorios universitarios, Google Books (vista previa amplia), Internet Archive, Project Gutenberg, Wikisource | **Obligatoria preferida** |
| **B** | Gratis con registro | Academia.edu (autor), ResearchGate (preprints), JSTOR (programas free tier limitados) | Obligatoria si es la única vía al paper clave |
| **C** | Pago pero con sustituto A/B | Libro de texto comercial | Solo como **referencia principal** si existe **alternativa A/B equivalente** listada |
| **D** | Solo impreso / solo pago sin sustituto | Monografías caras sin PDF ni equivalente | **No puede ser obligatoria**; solo complementaria opcional |

---

## Reglas al armar bibliografía de un módulo

1. **Obligatoria:** mínimo 2–4 fuentes Tier A por módulo (papers, capítulos, cursos abiertos, entradas SEP).
2. **Por cada ítem Tier C** en obligatoria: debe existir un **Substituto digital (Tier A/B)** documentado en la ficha del módulo con nota de equivalencia (ej. "cubre cap. 3–5 del libro X").
3. **Recomendada:** libros fundacionales de lectura integral — **compra sugerida** cuando tenga sentido; no bloquean avance ni evaluación.
4. **Complementaria:** profundización, aspiracional, ediciones físicas — no bloquean avance.
5. **Idioma:** priorizar fuentes en inglés/español accesibles; ruso u otros solo si ya tenés competencia y hay acceso digital.
6. **Enlaces:** cada ítem obligatorio Tier A/B debe incluir **URL estable** (DOI, repositorio, OCW) en `modulo.md` y en la webapp.

---

## Si no podés conseguir un texto

| Situación | Acción |
|---|---|
| Libro obligatorio Tier C no disponible | Usar el **substituto digital** ya listado; registrar en `artefactos/nota-bibliografia.md` qué usaste |
| No hay substituto listado | **No bloquea** si consultás al Director Académico: debe proponer sustituto Tier A/B antes de evaluar |
| Solo tenés versión física personal | Válido; no exige compra adicional |
| Querés leer un libro recomendado entero pero aún no lo compraste | No bloquea; la evaluación usa obligatoria + substitutos |
| Solo necesitás un capítulo de un libro caro | Usar substituto digital; no hace falta comprar el libro |
| Paper detrás de paywall sin acceso institucional | Buscar preprint (arXiv, SSRN, autor en ResearchGate) o paper alternativo equivalente |

**Regla:** la imposibilidad de comprar **nunca** es motivo para posponer evaluación si hay substituto digital equivalente aprobado.

---

## Fuentes recomendadas (reutilizables)

| Recurso | URL | Para |
|---|---|---|
| Stanford Encyclopedia of Philosophy | plato.stanford.edu | Filosofía, lógica, epistemología |
| MIT OpenCourseWare | ocw.mit.edu | Matemática, CS, física, biología |
| OpenStax | openstax.org | Introductorios universitarios |
| Internet Archive / Open Library | archive.org | Libros clásicos y muchos académicos |
| PubMed Central | ncbi.nlm.nih.gov/pmc | Biomedicina, neurociencias |
| arXiv | arxiv.org | Física, CS, matemática |
| PhilPapers / PhilArchive | philpapers.org / philarchive.org | Filosofía |
| Google Scholar | scholar.google.com | Buscar versión PDF del autor |
| Semantic Scholar | semanticscholar.org | Papers con enlace a PDF |
| Biblioteca digital Cervantes / BDPH | — | Humanidades en español |

---

## Formato en ficha del módulo

```markdown
### Obligatoria

| # | Obra | Autor | Acceso | Tier | Substituto si aplica |
|---|---|---|---|---|---|
| 1 | Classical Logic (SEP) | — | https://plato.stanford.edu/... | A | — |
| 2 | Logic: A Very Short Introduction | Priest | Open Library / compra | C | SEP + Copi cap. 1-4 (archive.org) |

### Recomendada (compra sugerida si lectura integral)

| # | Obra | Autor | Por qué | Compra |
|---|---|---|---|---|
| 1 | Introduction to Logic | Copi / Hurley | Texto fundacional del track F; conviene leer entero | **Compra sugerida** (o archive.org si está disponible) |

### Complementaria (no bloquea)

| # | Obra | Autor | Notas |
|---|---|---|---|
| 1 | ... | ... | Solo si conseguís copia |
```

---

## Rol del Director Académico

Al diseñar o revisar bibliografía de un módulo:

1. Verificar que **100% de obligatoria** sea cubrible sin compra inmediata.
2. Documentar substitutos para cualquier Tier C (capítulos sueltos → digital, no compra del libro entero).
3. Reservar **compra sugerida** para libros fundacionales de lectura integral en bibliografía **recomendada**.
4. Rechazar módulos cuya bibliografía obligatoria sea solo libros de textbook caros.

---

## Rol del Evaluador

- Las preguntas de examen se basan en **obligatoria accesible** (Tier A/B + substitutos documentados).
- No evaluar sobre detalle exclusivo de un Tier C que el estudiante declaró no haber podido usar **si** usó el substituto equivalente.

---

## Documentos relacionados

- `templates/modulo.md` — plantilla con columnas de acceso
- `config/modelo_estudio.md` — ritmo libre (compra no debe frenar ritmo)
- `config/agente_evaluador.md` — corrección alineada a fuentes usadas
