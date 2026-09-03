import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./config";

type BrowserClient = ReturnType<typeof createBrowserClient>;

let cached: BrowserClient | null = null;
let failed = false;

export function createClient(): BrowserClient | null {
  if (failed) return null;
  if (cached) return cached;
  try {
    cached = createBrowserClient(supabaseUrl, supabaseAnonKey);
    return cached;
  } catch (error) {
    failed = true;
    console.error("No se pudo iniciar Supabase:", error);
    return null;
  }
}
