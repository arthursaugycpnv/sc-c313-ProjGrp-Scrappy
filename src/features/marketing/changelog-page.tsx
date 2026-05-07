"use client";

import { useLocale } from "next-intl";

import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ChangelogPage() {
  const locale = useLocale() as "fr" | "en" | "de" | "it";
  const t = copy[locale];

  return (
    <div>
      <Section>
        <Badge>{t.badge}</Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[rgb(var(--foreground))]/70">
          {t.subtitle}
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6">
          {t.items.map((it) => (
            <Card key={it.v}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm font-semibold">{it.v}</div>
                <div className="text-xs text-[rgb(var(--foreground))]/60">
                  {it.date}
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {it.changes.map((c: string) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-0.5 inline-block size-4 rounded bg-[rgb(var(--brand-500))]/15" />
                    <span className="text-[rgb(var(--foreground))]/80">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

const copy = {
  fr: {
    badge: "Changelog",
    title: "Nouveautés & améliorations",
    subtitle:
      "Un historique transparent. Tu vois ce qui évolue, pourquoi, et ce que ça change pour toi.",
    items: [
      {
        v: "v0.2",
        date: "Mai 2026",
        changes: [
          "Ajout du site marketing multilingue",
          "Scoring + pipeline preview (démo)",
          "Sitemap + OG image",
        ],
      },
      {
        v: "v0.1",
        date: "Mai 2026",
        changes: [
          "Mise en place du design system",
          "Navbar + footer",
          "Pages Features / Pricing / Integrations",
        ],
      },
    ],
  },
  en: {
    badge: "Changelog",
    title: "Updates & improvements",
    subtitle:
      "A transparent log. See what changes, why it matters, and what you get.",
    items: [
      {
        v: "v0.2",
        date: "May 2026",
        changes: [
          "Multilingual marketing site",
          "Scoring + pipeline preview (demo)",
          "Sitemap + OG image",
        ],
      },
      {
        v: "v0.1",
        date: "May 2026",
        changes: [
          "Design system foundation",
          "Navbar + footer",
          "Features / Pricing / Integrations pages",
        ],
      },
    ],
  },
  de: {
    badge: "Changelog",
    title: "Updates & Verbesserungen",
    subtitle:
      "Transparentes Log. Was sich ändert, warum es wichtig ist, und was du bekommst.",
    items: [
      {
        v: "v0.2",
        date: "Mai 2026",
        changes: [
          "Mehrsprachige Marketing-Seite",
          "Scoring + Pipeline Preview (Demo)",
          "Sitemap + OG Image",
        ],
      },
      {
        v: "v0.1",
        date: "Mai 2026",
        changes: [
          "Design system Basis",
          "Navbar + Footer",
          "Seiten Features / Preise / Integrationen",
        ],
      },
    ],
  },
  it: {
    badge: "Changelog",
    title: "Novità & miglioramenti",
    subtitle: "Log trasparente. Cosa cambia, perché conta e cosa ottieni.",
    items: [
      {
        v: "v0.2",
        date: "Maggio 2026",
        changes: [
          "Sito marketing multilingua",
          "Scoring + pipeline preview (demo)",
          "Sitemap + OG image",
        ],
      },
      {
        v: "v0.1",
        date: "Maggio 2026",
        changes: [
          "Fondazione design system",
          "Navbar + footer",
          "Pagine Features / Pricing / Integrations",
        ],
      },
    ],
  },
};
