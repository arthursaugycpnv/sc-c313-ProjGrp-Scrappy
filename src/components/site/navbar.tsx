"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { cn } from "@/lib/utils";
import {
  applyThemePreference,
  getEffectiveTheme,
  getStoredTheme,
  toggleTheme,
  type ThemePreference,
} from "@/lib/theme/theme";

type NavLink = { href: string; label: string };
type NavCopy = { links: NavLink[]; cta: string };

function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  // pathname includes locale prefix, e.g. /fr/demo
  if (href === "/") return pathname === "/";
  return (
    pathname === href ||
    pathname.endsWith(href) ||
    pathname.includes(`${href}/`)
  );
}

const nav = {
  fr: {
    links: [
      { href: "/app", label: "Dashboard" },
      { href: "/features", label: "Fonctionnalités" },
      { href: "/pricing", label: "Tarifs" },
      { href: "/integrations", label: "Intégrations" },
      { href: "/demo", label: "Démo" },
      { href: "/contact", label: "Contact" },
    ],
    cta: "Démarrer",
  },
  en: {
    links: [
      { href: "/app", label: "Dashboard" },
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/integrations", label: "Integrations" },
      { href: "/demo", label: "Demo" },
      { href: "/contact", label: "Contact" },
    ],
    cta: "Get started",
  },
  de: {
    links: [
      { href: "/app", label: "Dashboard" },
      { href: "/features", label: "Funktionen" },
      { href: "/pricing", label: "Preise" },
      { href: "/integrations", label: "Integrationen" },
      { href: "/demo", label: "Demo" },
      { href: "/contact", label: "Kontakt" },
    ],
    cta: "Loslegen",
  },
  it: {
    links: [
      { href: "/app", label: "Dashboard" },
      { href: "/features", label: "Funzionalità" },
      { href: "/pricing", label: "Prezzi" },
      { href: "/integrations", label: "Integrazioni" },
      { href: "/demo", label: "Demo" },
      { href: "/contact", label: "Contatto" },
    ],
    cta: "Inizia",
  },
} satisfies Record<Locale, NavCopy>;

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [themePref, setThemePref] = useState<ThemePreference>(() =>
    getStoredTheme(),
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    applyThemePreference(themePref);
  }, [themePref]);

  const authed = useMemo(() => {
    // MVP auth: cookie presence check on client.
    if (typeof document === "undefined") return false;
    return document.cookie.includes("scrappy_session=");
  }, [pathname]);

  const items = useMemo(() => nav[locale], [locale]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-[rgb(var(--border))] backdrop-blur",
        scrolled
          ? "bg-[rgb(var(--background))]/80 shadow-sm"
          : "bg-[rgb(var(--background))]/50",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="LeadForge AI"
            className="size-8"
            aria-hidden
          />
          <span className="text-sm font-semibold tracking-tight">
            LeadForge AI
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {items.links
            .filter((l) => (l.href === "/app" ? authed : true))
            .map((l: NavLink) => {
              const active = isActivePath(pathname, `/${locale}${l.href}`);
              return (
                <Link
                  key={l.href}
                  href={`/${locale}${l.href}`}
                  className={cn(
                    "group relative rounded-full px-3 py-2 text-sm transition-all",
                    active
                      ? "text-[rgb(var(--foreground))] bg-gradient-to-r from-brand-500/15 to-cyan-400/15 ring-1 ring-brand-500/25 shadow-sm"
                      : "text-[rgb(var(--foreground))]/70 hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]/60",
                  )}
                >
                  {l.label}
                  {active ? (
                    <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" />
                  ) : (
                    <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 opacity-0 transition-opacity group-hover:opacity-30" />
                  )}
                </Link>
              );
            })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))]"
            aria-label={
              getEffectiveTheme(themePref) === "dark"
                ? "Activer le thème clair"
                : "Activer le thème sombre"
            }
            onClick={() => setThemePref((prev) => toggleTheme(prev))}
            title={
              getEffectiveTheme(themePref) === "dark"
                ? "Thème clair"
                : "Thème sombre"
            }
          >
            {getEffectiveTheme(themePref) === "dark" ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          {!authed ? (
            <Link
              href={`/${locale}/auth?next=/${locale}/app`}
              className="hidden md:inline-flex h-10 items-center justify-center rounded-full border border-[rgb(var(--border))] px-4 text-sm font-medium hover:bg-[rgb(var(--muted))]"
            >
              Connexion
            </Link>
          ) : null}
          <Link
            href={`/${locale}/pricing`}
            className="hidden md:inline-flex h-10 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
          >
            {items.cta}
          </Link>
          <MobileMenu
            locale={locale}
            links={items.links}
            cta={items.cta}
            authed={authed}
          />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({
  locale,
  links,
  cta,
  authed,
}: {
  locale: Locale;
  links: Array<{ href: string; label: string }>;
  cta: string;
  authed: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))]"
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-lg">☰</span>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-16 border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3">
            {links.map((l) =>
              (() => {
                if (l.href === "/app" && !authed) return null;
                const active = isActivePath(pathname, `/${locale}${l.href}`);
                return (
                  <Link
                    key={l.href}
                    href={`/${locale}${l.href}`}
                    className={cn(
                      "py-2 text-sm rounded-xl px-3 transition-colors",
                      active
                        ? "bg-gradient-to-r from-brand-500/15 to-cyan-400/15 text-[rgb(var(--foreground))] ring-1 ring-brand-500/25"
                        : "hover:bg-[rgb(var(--muted))]/60 text-[rgb(var(--foreground))]/80",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                );
              })(),
            )}

            {!authed ? (
              <Link
                href={`/${locale}/auth?next=/${locale}/app`}
                className="mt-1 inline-flex h-10 items-center justify-center rounded-full border border-[rgb(var(--border))] px-4 text-sm font-medium hover:bg-[rgb(var(--muted))]"
                onClick={() => setOpen(false)}
              >
                Connexion
              </Link>
            ) : null}
            <Link
              href={`/${locale}/pricing`}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background"
              onClick={() => setOpen(false)}
            >
              {cta}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
