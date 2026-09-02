# Flujo de trabajo del expediente

## Al iniciar un módulo

1. Verificar en `indice.md` que el módulo está `disponible`.
2. Crear carpeta `expediente/modulos/MXX-nombre/` (copiar estructura de M01).
3. Copiar `templates/modulo.md` → completar metadatos desde `plan_general.json`.
4. Actualizar `progreso.json`: `"estado": "en_curso"`, `"fecha_inicio"`.
5. Actualizar `indice.md`: módulo activo.

## Durante la cursada

1. Marcar temas del programa en `modulo.md` (o webapp) a medida que los cubrís.
2. Guardar artefactos en `artefactos/` cuando quieras (≥1 antes de evaluar).
3. *(Opcional)* Notas libres en `notas/` o `semanas/` — no obligatorio.

## Al solicitar evaluación

1. Verificar checklist en `modulo.md`: programa ≥90%, bibliografía, ≥1 artefacto.
2. Cambiar estado a `evaluacion` en `progreso.json`.
3. Solicitar evaluación al Agente Evaluador (`config/agente_evaluador.md`).

## Al rendir evaluación

1. Copiar `templates/evaluacion.md` → `evaluaciones/intento-N.md`.
2. Completar respuestas en sesión asincrónica.
3. Agente Evaluador corrige con rúbrica.
4. Si ≥70%: estado `aprobado`, archivar en `expediente/evaluaciones/MXX-intento-N.md`.
5. Desbloquear siguiente módulo en `progreso.json` (orden secuencial + prerrequisitos).
6. Actualizar `indice.md` y `%` de cobertura de carreras si aplica.

## Lecturas L1 (fuera de módulo)

1. Copiar `templates/lectura_complementaria.md` → `expediente/lecturas/YYYY-MM-DD-tema.md`.
2. No suma horas de módulo salvo anotación explícita.

## Regla de un solo módulo activo

Nunca tener dos módulos en `en_curso` simultáneamente.

## Backup

Se recomienda:

```powershell
cd C:\Users\Marcos\Licenciatura-en-yo-mismo
git init
git add .
git commit -m "Expediente: estado inicial"
```

Repetir commit al aprobar cada módulo.
