"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/plan", label: "Plan" },
];

export function Nav() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/95 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-stone-900 dark:text-stone-100">
            Estudios de Síntesis Profunda
          </p>
          <p className="truncate text-xs text-stone-500">Licenciatura en yo mismo</p>
        </Link>
        <nav className="flex shrink-0 items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-stone-600 transition hover:bg-stone-200/60 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className="rounded-lg px-3 py-1.5 text-sm text-stone-500 transition hover:bg-stone-200/60 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800"
              title={user.email ?? ""}
            >
              Salir
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-stone-900 px-3 py-1.5 text-sm text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900"
            >
              Ingresar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
