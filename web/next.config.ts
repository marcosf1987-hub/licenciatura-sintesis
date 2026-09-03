import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export" — desactivado en Fase 2 para habilitar API routes (auth callback)
  // Vercel sirve Next.js con SSR; el export estático ya no es necesario.
  images: { unoptimized: true },
};

export default nextConfig;
