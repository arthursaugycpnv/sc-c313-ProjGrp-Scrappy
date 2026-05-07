"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FeaturesPage() {
  const locale = useLocale() as "fr" | "en" | "de" | "it";
  const t = copy[locale];

  return (
    <div>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Badge>{t.badge}</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[rgb(var(--foreground))]/70">
            {t.subtitle}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background hover:opacity-90"
            >
              {t.primary}
            </Link>
            <Link
              href={`/${locale}/demo`}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[rgb(var(--border))] px-5 text-sm font-medium hover:bg-[rgb(var(--muted))]"
            >
              {t.secondary}
            </Link>
          </div>
        </motion.div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {t.blocks.map((b) => (
            <Card key={b.title}>
              <div className="text-sm font-semibold">{b.title}</div>
              <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">
                {b.desc}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {b.bullets.map((x: string) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-0.5 inline-block size-4 rounded bg-[rgb(var(--brand-500))]/15" />
                    <span className="text-[rgb(var(--foreground))]/80">
                      {x}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {t.workflow.title}
              </h2>
              <p className="mt-3 text-[rgb(var(--foreground))]/70">
                {t.workflow.subtitle}
              </p>
            </div>
            <div className="grid gap-3">
              {t.workflow.steps.map((s: { k: string; v: string }) => (
                <div
                  key={s.k}
                  className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]/50 p-4"
                >
                  <div className="text-sm font-semibold">{s.k}</div>
                  <div className="mt-1 text-sm text-[rgb(var(--foreground))]/70">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

const copy = {
  fr: {
    badge: "Fonctionnalités",
    title: "Tout ce qu’il faut pour trouver, scorer et convertir",
    subtitle:
      "Inspiré des meilleures pratiques de prospection locale: découverte rapide, scoring actionnable, et un parcours clair pour passer à l’action.",
    primary: "Voir les tarifs",
    secondary: "Regarder la démo",
    blocks: [
      {
        title: "AI Lead Discovery",
        desc: "Définis ta niche + ta zone et reçois une liste exploitable immédiatement.",
        bullets: [
          "Niche + localisation",
          "Filtres simples",
          "Résultats en quelques secondes",
        ],
      },
      {
        title: "Opportunity Scoring",
        desc: "Priorise les leads qui ont un problème visible et un intérêt probable.",
        bullets: [
          "Site absent / lent / faible UX",
          "Signaux “achat”",
          "Tri par potentiel",
        ],
      },
      {
        title: "Outreach Toolkit",
        desc: "Contact + scripts + suivi. Tout pour garder le rythme sans se perdre.",
        bullets: [
          "Données de contact",
          "Scripts personnalisables",
          "Statuts de suivi",
        ],
      },
    ],
    workflow: {
      title: "Un workflow pensé pour les freelances & solopreneurs",
      subtitle:
        "Moins de clics, plus de clarté. On optimise ton temps—pas juste tes données.",
      steps: [
        { k: "Cibler", v: "Définis ton ICP local (niche, zone, taille)." },
        {
          k: "Qualifier",
          v: "Analyse des signaux: site, avis, infos manquantes.",
        },
        { k: "Agir", v: "Export + scripts + suivi pour enchaîner." },
      ],
    },
  },
  en: {
    badge: "Features",
    title: "Everything you need to discover, score, and convert",
    subtitle:
      "Inspired by best practices in local prospecting: fast discovery, actionable scoring, and a clear path to execution.",
    primary: "See pricing",
    secondary: "Watch demo",
    blocks: [
      {
        title: "AI Lead Discovery",
        desc: "Define your niche + area and get an outreach-ready list instantly.",
        bullets: ["Niche + location", "Simple filters", "Results in seconds"],
      },
      {
        title: "Opportunity Scoring",
        desc: "Prioritize leads with visible pain and higher buying intent.",
        bullets: [
          "Missing / slow / weak UX site",
          "Buying signals",
          "Sort by potential",
        ],
      },
      {
        title: "Outreach Toolkit",
        desc: "Contacts + scripts + tracking. Keep momentum without chaos.",
        bullets: ["Contact info", "Customizable scripts", "Pipeline statuses"],
      },
    ],
    workflow: {
      title: "A workflow built for freelancers & solopreneurs",
      subtitle:
        "Fewer clicks, more clarity. We optimize your time—not just your data.",
      steps: [
        { k: "Target", v: "Define your local ICP (niche, area, size)." },
        { k: "Qualify", v: "Analyze signals: site, reviews, missing info." },
        { k: "Execute", v: "Export + scripts + tracking." },
      ],
    },
  },
  de: {
    badge: "Funktionen",
    title: "Alles, um Leads zu finden, zu bewerten und zu konvertieren",
    subtitle:
      "Inspiriert von Best Practices für lokale Akquise: schnelle Discovery, klares Scoring und ein Weg zur Umsetzung.",
    primary: "Preise ansehen",
    secondary: "Demo ansehen",
    blocks: [
      {
        title: "AI Lead Discovery",
        desc: "Nische + Region definieren und sofort eine Outreach-Liste erhalten.",
        bullets: [
          "Nische + Standort",
          "Einfache Filter",
          "Ergebnisse in Sekunden",
        ],
      },
      {
        title: "Opportunity Scoring",
        desc: "Priorisiere Leads mit sichtbarem Pain und höherer Kaufabsicht.",
        bullets: [
          "Fehlend / langsam / schwache UX",
          "Buying Signals",
          "Sortierung nach Potenzial",
        ],
      },
      {
        title: "Outreach Toolkit",
        desc: "Kontakte + Skripte + Tracking. Momentum ohne Chaos.",
        bullets: ["Kontaktdaten", "Anpassbare Skripte", "Pipeline-Status"],
      },
    ],
    workflow: {
      title: "Workflow für Freelancer & Solopreneurs",
      subtitle: "Weniger Klicks, mehr Klarheit. Wir optimieren deine Zeit.",
      steps: [
        { k: "Zielen", v: "Lokales ICP definieren (Nische, Region, Größe)." },
        {
          k: "Qualifizieren",
          v: "Signale analysieren: Website, Reviews, fehlende Infos.",
        },
        { k: "Umsetzen", v: "Export + Skripte + Tracking." },
      ],
    },
  },
  it: {
    badge: "Funzionalità",
    title: "Tutto per scoprire, valutare e convertire",
    subtitle:
      "Ispirato alle best practice della prospezione locale: scoperta rapida, scoring azionabile e percorso chiaro.",
    primary: "Vedi prezzi",
    secondary: "Guarda la demo",
    blocks: [
      {
        title: "AI Lead Discovery",
        desc: "Definisci nicchia + zona e ottieni subito una lista pronta.",
        bullets: [
          "Nicchia + posizione",
          "Filtri semplici",
          "Risultati in pochi secondi",
        ],
      },
      {
        title: "Opportunity Scoring",
        desc: "Dai priorità ai lead con pain visibile e intenzione d’acquisto.",
        bullets: [
          "Sito assente / lento / UX debole",
          "Segnali di acquisto",
          "Ordina per potenziale",
        ],
      },
      {
        title: "Outreach Toolkit",
        desc: "Contatti + script + tracking. Mantieni il ritmo.",
        bullets: [
          "Dati di contatto",
          "Script personalizzabili",
          "Stati pipeline",
        ],
      },
    ],
    workflow: {
      title: "Un workflow per freelance & solopreneur",
      subtitle: "Meno click, più chiarezza. Ottimizziamo il tuo tempo.",
      steps: [
        { k: "Target", v: "Definisci ICP locale (nicchia, zona, dimensione)." },
        {
          k: "Qualifica",
          v: "Analizza segnali: sito, recensioni, info mancanti.",
        },
        { k: "Esegui", v: "Export + script + tracking." },
      ],
    },
  },
};
