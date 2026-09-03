export interface UnidadDoc {
  id: string;
  num: number;
  slug: string;
  title: string;
  body: string;
}

export interface ModuloDoc {
  intro: string;
  unidades: UnidadDoc[];
}

export function parseModuloMarkdown(raw: string): ModuloDoc {
  const text = raw.replace(/^# .+\n+/, "").trim();
  const detalle = text.search(/^## Detalle por unidad/m);
  let intro = (detalle >= 0 ? text.slice(0, detalle) : text).trim();
  intro = intro.replace(/^## Unidades[\s\S]*?(?=^## )/m, "").trim();

  const rest = detalle >= 0 ? text.slice(detalle) : "";
  const chunks = rest.split(/^(?=### U\d+)/m).filter((c) => c.trim());

  const unidades: UnidadDoc[] = [];
  let cola = "";

  for (const chunk of chunks) {
    const match = chunk.match(/^### (U(\d+))\s*[—–-]\s*(.+)\n/);
    if (!match) {
      if (/^## Detalle por unidad/.test(chunk.trim())) continue;
      cola += chunk;
      continue;
    }
    const id = match[1].toUpperCase();
    const num = Number(match[2]);
    const title = match[3].trim();
    let body = chunk.slice(match[0].length).trim();
    // Solo cortar si aparece un ## de nivel módulo (no ### de subsección)
    const extraHeading = body.search(/^## [^#]/m);
    if (extraHeading >= 0) {
      cola += body.slice(extraHeading);
      body = body.slice(0, extraHeading).trim();
    }
    unidades.push({
      id,
      num,
      slug: `u${num}`,
      title,
      body,
    });
  }

  // Material suelto al final (si quedó) se agrega a la última unidad, no a la intro
  if (cola.trim() && unidades.length > 0) {
    const last = unidades[unidades.length - 1];
    last.body = `${last.body}\n\n${cola.trim()}`;
  }

  return { intro, unidades };
}

export function unidadSlugFromNum(n: number): string {
  return `u${n}`;
}
