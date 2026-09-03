import { createBrowserClient } from "@supabase/ssr";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { isAllowedEmail, supabaseAnonKey, supabaseUrl } from "./config";

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

function acceptUser(user: User | null): User | null {
  if (!user) return null;
  if (!isAllowedEmail(user.email)) {
    const supabase = createClient();
    void supabase?.auth.signOut();
    return null;
  }
  return user;
}

export function watchAuth(onUser: (user: User | null) => void): () => void {
  const supabase = createClient();
  if (!supabase) {
    onUser(null);
    return () => undefined;
  }
  void supabase.auth.getUser().then((result: { data: { user: User | null } }) => {
    onUser(acceptUser(result.data.user ?? null));
  });
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (_event: AuthChangeEvent, session: Session | null) => {
      onUser(acceptUser(session?.user ?? null));
    }
  );
  return () => subscription.unsubscribe();
}
