# Flujo de trabajo del expediente

## Al iniciar un módulo

1. Verificar en `indice.md` que el módulo está `disponible`.
2. Crear carpeta `expediente/modulos/MXX-nombre/` (copiar estructura de M01).
3. Copiar `templates/modulo.md` → completar metadatos desde `plan_general.json`.
4. Actualizar `progreso.json`: `"estado": "en_curso"`, `"fecha_inicio"`.
5. Actualizar `indice.md`: módulo activo.

## Durante la cursada (cada semana)

1. Copiar `templates/semana.md` → `semanas/SXX.md`.
2. Registrar horas diarias al cierre de cada día.
3. Al terminar la semana: sumar horas a `modulo.md` y `progreso.json`.

## Al completar 60 horas

1. Verificar checklist de evidencias en `modulo.md`.
2. Cambiar estado a `evaluacion` en `progreso.json`.
3. Solicitar evaluación al Agente Evaluador.

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
