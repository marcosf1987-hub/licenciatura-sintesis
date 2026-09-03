"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { allowedEmail, isAllowedEmail } from "@/lib/supabase/config";

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "forbidden"
      ? "Este expediente es personal. Solo entra el titular."
      : null
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!allowedEmail) {
      setError("Falta configurar NEXT_PUBLIC_ALLOWED_EMAIL (tu correo).");
      setLoading(false);
      return;
    }
    if (!isAllowedEmail(email)) {
      setError("Este expediente es personal. El correo no está autorizado.");
      setLoading(false);
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setError("No se pudo conectar con Supabase.");
      setLoading(false);
      return;
    }
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (otpError) {
      setError(otpError.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-24">
      <h1 className="mb-2 text-xl font-semibold tracking-tight">
        Acceder al expediente
      </h1>
      <p className="mb-8 text-sm text-stone-500 dark:text-stone-400">
        Acceso del titular. Un solo correo autorizado.
      </p>

      {sent ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/40">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            Revisá tu correo
          </p>
          <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
            Enviamos el enlace a <strong>{email}</strong>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu correo"
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
          </div>
          {error && (
            <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
          >
            {loading ? "Enviando…" : "Enviar enlace"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="px-4 py-24 text-center text-sm text-stone-500">Cargando…</div>}>
      <LoginForm />
    </Suspense>
  );
}
