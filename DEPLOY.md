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

1. [vercel.com/new](https://vercel.com/new) → Import Git Repository
2. Seleccionar el repo
3. **Root Directory:** `web`
4. Framework: Next.js (auto-detectado)
5. Deploy

Variables de entorno: ninguna requerida en Fase 1.

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
