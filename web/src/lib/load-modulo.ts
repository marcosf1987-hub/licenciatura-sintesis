import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { parseModuloMarkdown, type ModuloDoc } from "./parse-modulo";

export function loadModuloMarkdown(moduloId: string): string | null {
  const path = join(process.cwd(), "content", "modulos", `${moduloId}.md`);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf-8");
}

export function loadModuloDoc(moduloId: string): ModuloDoc | null {
  const raw = loadModuloMarkdown(moduloId);
  if (!raw) return null;
  return parseModuloMarkdown(raw);
}
