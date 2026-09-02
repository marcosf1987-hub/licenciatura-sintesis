import { copyFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");
const web = join(__dirname, "..");

const copies = [
  [join(root, "plan_general.json"), join(web, "src", "data", "plan_general.json")],
  [join(root, "expediente", "progreso.json"), join(web, "src", "data", "progreso.json")],
  [
    join(root, "expediente", "modulos", "M01-logica-proposicional-predicados", "modulo.md"),
    join(web, "content", "modulos", "M01.md"),
  ],
];

mkdirSync(join(web, "src", "data"), { recursive: true });
mkdirSync(join(web, "content", "modulos"), { recursive: true });

for (const [src, dest] of copies) {
  if (!existsSync(src)) {
    if (existsSync(dest)) {
      console.log(`↷ Sin fuente; usando copia existente: ${dest.replace(web, ".")}`);
      continue;
    }
    console.warn(`⚠ No encontrado: ${src}`);
    continue;
  }
  copyFileSync(src, dest);
  console.log(`✓ ${dest.replace(web, ".")}`);
}

console.log("Contenido sincronizado.");
