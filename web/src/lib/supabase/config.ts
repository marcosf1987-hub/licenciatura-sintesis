const FALLBACK_URL = "https://nowbnrarhkiyycosmjke.supabase.co";
const FALLBACK_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vd2JucmFyaGtpeXljb3NtamtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDIyNzMsImV4cCI6MjEwNDAxODI3M30.TQ4mpkuMxkg-QyWv9l04RSoCxhTHMnoHVGK0hSmgmpA";

function clean(value: string | undefined): string {
  return (value ?? "").trim().replace(/^["']|["']$/g, "");
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const fromEnv = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
export const supabaseUrl = isHttpUrl(fromEnv) ? fromEnv : FALLBACK_URL;

const keyFromEnv = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const supabaseAnonKey = keyFromEnv.startsWith("eyJ")
  ? keyFromEnv
  : FALLBACK_KEY;

/** Único correo autorizado. Definilo en Vercel / .env.local */
export const allowedEmail = clean(process.env.NEXT_PUBLIC_ALLOWED_EMAIL).toLowerCase();

export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!allowedEmail) return false;
  return (email ?? "").trim().toLowerCase() === allowedEmail;
}
