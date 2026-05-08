"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/i18n/routing";
import { Card } from "@/components/ui/card";

type Mode = "login" | "register";

export function AuthPage({
  locale,
  nextPath,
}: {
  locale: Locale;
  nextPath?: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const target = useMemo(() => {
    if (nextPath && nextPath.startsWith(`/${locale}/`)) return nextPath;
    return `/${locale}/app`;
  }, [locale, nextPath]);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint =
        mode === "register" ? "/api/auth/register" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        throw new Error(data.message || "Erreur");
      }

      router.push(target);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Card className="p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {mode === "login" ? "Connexion" : "Inscription"}
          </h1>
          <p className="text-sm text-[rgb(var(--foreground))]/70">
            Le Dashboard est accessible uniquement après connexion.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="text-sm">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 h-11 w-full rounded-xl border border-[rgb(var(--border))] bg-transparent px-3"
              placeholder="toi@exemple.com"
              autoComplete="email"
            />
          </label>

          <label className="text-sm">
            Mot de passe
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 h-11 w-full rounded-xl border border-[rgb(var(--border))] bg-transparent px-3"
              placeholder="••••••••"
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
            />
          </label>

          {error ? (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <button
            onClick={submit}
            disabled={loading || !email || password.length < 4}
            className="btn btn-primary h-11"
          >
            {loading
              ? "…"
              : mode === "login"
                ? "Se connecter"
                : "Créer mon compte"}
          </button>

          <div className="flex items-center justify-between gap-3 text-sm">
            <button
              className="underline text-[rgb(var(--foreground))]/70 hover:text-[rgb(var(--foreground))]"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              type="button"
            >
              {mode === "login"
                ? "Pas de compte ? S’inscrire"
                : "Déjà un compte ? Se connecter"}
            </button>

            <a
              className="underline text-[rgb(var(--foreground))]/70 hover:text-[rgb(var(--foreground))]"
              href={`/${locale}`}
            >
              Retour au site
            </a>
          </div>
        </div>
      </Card>
    </main>
  );
}
