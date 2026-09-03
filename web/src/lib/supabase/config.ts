/**
 * URL y anon key son públicas por diseño (RLS protege los datos).
 * Fallback: si Vercel no inyecta NEXT_PUBLIC_* en el bundle, la app no crashea.
 */
export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://nowbnrarhkiyycosmjke.supabase.co";

export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vd2JucmFyaGtpeXljb3NtamtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDIyNzMsImV4cCI6MjEwNDAxODI3M30.TQ4mpkuMxkg-QyWv9l04RSoCxhTHMnoHVGK0hSmgmpA";
