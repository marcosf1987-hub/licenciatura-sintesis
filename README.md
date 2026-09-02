# Licenciatura en yo mismo: Estudios de Síntesis Profunda

Programa personal de formación integral (7–8 años · ~360 h/año · 1 h/día).

## Objetivo

Comprender las estructuras profundas (materiales, psíquicas, lingüísticas y sociales) que sostienen lo visible, y explorar las zonas liminales donde esas estructuras fallan, producen mito o generan lo anómalo.

## Estructura del repositorio

```
Licenciatura-en-yo-mismo/
├── README.md                 ← Este archivo
├── plan_general.json         ← Plan curricular completo (42 módulos)
├── config/
│   └── reglas_progresion.md  ← Reglas de avance, evaluación y reprobación
├── diagnostico/
│   ├── perfil_entrada.md     ← Línea de base (Bloque 1 del counselor)
│   └── clusters.md           ← 13 familias de estudio
├── expediente/
│   ├── indice.md             ← Dashboard principal (estado actual)
│   ├── progreso.json         ← Estado machine-readable de todos los módulos
│   ├── modulos/              ← Un subdirectorio por módulo (M01…M48)
│   ├── evaluaciones/         ← Copias archivadas de exámenes aprobados
│   └── lecturas/             ← Notas de lectura complementaria (L1)
└── templates/
    ├── modulo.md             ← Plantilla de ficha de módulo
    ├── evaluacion.md         ← Plantilla de instancia de evaluación
    └── semana.md             ← Plantilla de registro semanal
```

## Cómo usar el expediente

1. **Consultar estado:** abrir `expediente/indice.md` o `expediente/progreso.json`.
2. **Iniciar un módulo:** copiar `templates/modulo.md` a `expediente/modulos/MXX-nombre/modulo.md`.
3. **Registrar estudio semanal:** crear archivos en `expediente/modulos/MXX-nombre/semanas/` usando `templates/semana.md`.
4. **Rendir evaluación:** completar `templates/evaluacion.md`, guardar en `expediente/modulos/MXX-nombre/evaluaciones/` y archivar copia en `expediente/evaluaciones/`.
5. **Actualizar progreso:** cambiar estado en `progreso.json` e `indice.md` al aprobar.

## Convenciones

- **Estados de módulo:** `bloqueado` → `disponible` → `en_curso` → `evaluacion` → `aprobado` | `reprobado`
- **Horas:** registrar tiempo real de estudio intensivo (no incluye lectura L1 complementaria salvo que se indique).
- **Formato:** Markdown para humanos, JSON para datos estructurados. Texto plano = longevidad a 10 años.
- **Versionado:** se recomienda init git en esta carpeta para historial del expediente.

## Próximo paso operativo

Diseñar el **M01 — Lógica Proposicional y de Predicados** (programa semanal + bibliografía + rúbrica).
