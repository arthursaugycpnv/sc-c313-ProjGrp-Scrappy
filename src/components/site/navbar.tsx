"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string };
type NavCopy = { links: NavLink[]; cta: string };

const nav = {
  fr: {
    links: [
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <div className="size-8 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400" />
          <span className="text-sm font-semibold tracking-tight">
            LeadForge AI
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {items.links.map((l: NavLink) => (
            <Link
              key={l.href}
              href={`/${locale}${l.href}`}
              className={cn(
                "text-sm text-[rgb(var(--foreground))]/70 hover:text-[rgb(var(--foreground))] transition-colors",
                pathname?.endsWith(l.href) ? "text-foreground" : "",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/pricing`}
            className="hidden md:inline-flex h-10 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
          >
            {items.cta}
          </Link>
          <MobileMenu locale={locale} links={items.links} cta={items.cta} />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({
  locale,
  links,
  cta,
}: {
  locale: Locale;
  links: Array<{ href: string; label: string }>;
  cta: string;
}) {
  const [open, setOpen] = useState(false);

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
            {links.map((l) => (
              <Link
                key={l.href}
                href={`/${locale}${l.href}`}
                className="py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
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
