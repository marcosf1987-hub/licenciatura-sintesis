# Despliegue — GitHub + Vercel

## 1. Repositorio GitHub

```powershell
cd C:\Users\Marcos\Licenciatura-en-yo-mismo
git init
git add .
git commit -m "Initial commit: expediente, plan y webapp Fase 1"
```

Crear repo privado en [github.com/new](https://github.com/new) (sin README ni .gitignore).

```powershell
git branch -M main
git remote add origin https://github.com/TU_USUARIO/licenciatura-sintesis.git
git push -u origin main
```

## 2. Vercel

### Opción A — Desde la raíz del repo (recomendada, ya configurada)

El archivo `vercel.json` en la raíz del repo indica a Vercel cómo construir la carpeta `web/`:

- **Install:** `npm install --prefix web`
- **Build:** `npm run build --prefix web`
- **Output:** `web/out` (export estático)

1. [vercel.com/new](https://vercel.com/new) → Importar el repo
2. **Root Directory:** dejar vacío (raíz del repo)
3. **Framework Preset:** Other (o detectará output estático)
4. Deploy

### Opción B — Root Directory = `web`

Si preferís preset Next.js nativo:

1. Root Directory: `web`
2. Framework: Next.js
3. Eliminar `vercel.json` de la raíz del repo

### Si el deploy se traba o falla

1. **Settings → General → Root Directory:** debe estar **vacío** (Opción A) o **`web`** (Opción B), no ambos a la vez mal configurados.
2. **Settings → Build → Node.js Version:** 20.x
3. Cancelar el deploy colgado y hacer **Redeploy** tras pushear el fix.
4. Revisar logs: debe aparecer `npm install --prefix web` y luego `next build`.

## 3. Sincronizar contenido antes de build

Cuando actualices archivos en la raíz del repo (`plan_general.json`, `expediente/`), sincronizá antes de commitear:

```powershell
npm run sync
git add web/src/data web/content
git commit -m "Sync content to webapp"
```

En Vercel (root = `web`) se usan las copias commiteadas en `web/src/data/` y `web/content/`.

## 4. PWA en celular

Tras el deploy, abrir la URL en Chrome/Safari → "Agregar a pantalla de inicio".

## 5. Fase 2 (próxima)

- Supabase para progreso interactivo
- Horas pasivas (session tracking)
- Checklist y artefactos en UI
