"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const blueCard =
  "border-brand-500/25 bg-gradient-to-br from-brand-500/10 via-[rgb(var(--card))] to-cyan-400/10 transition-all duration-200 ease-out hover:border-brand-500/35 hover:shadow-lg hover:shadow-brand-500/10 hover:-translate-y-0.5 hover:scale-[1.02]";

export function IntegrationsPage() {
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
        </motion.div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((it) => (
            <Card key={it.name} className={cn(blueCard, "group")}>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-[rgb(var(--muted))] text-sm font-semibold">
                  {it.logo}
                </div>
                <div>
                  <div className="text-sm font-semibold">{it.name}</div>
                  <div className="text-xs text-[rgb(var(--foreground))]/60">
                    {it.kind}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-[rgb(var(--foreground))]/70">
                {it.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {it.tags.map((t: string) => (
                  <span
                    key={t}
                    className="rounded-full bg-[rgb(var(--muted))] px-2 py-1 text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

const copy = {
  fr: {
    badge: "Intégrations",
    title: "Fonctionne avec tes outils",
    subtitle:
      "Connecte tes exports et ton suivi. Tu peux commencer simple (CSV) et évoluer vers un stack complet.",
    items: [
      {
        name: "Google Maps",
        kind: "Source",
        logo: "GM",
        desc: "Découverte locale et signaux de présence.",
        tags: ["Local", "Maps", "Reviews"],
      },
      {
        name: "Gmail",
        kind: "Outreach",
        logo: "G",
        desc: "Prépare tes emails et organise tes conversations.",
        tags: ["Email", "Templates"],
      },
      {
        name: "Notion",
        kind: "CRM léger",
        logo: "N",
        desc: "Suivi simple des leads et des statuts.",
        tags: ["Pipeline", "Docs"],
      },
      {
        name: "HubSpot",
        kind: "CRM",
        logo: "HS",
        desc: "Pour les équipes qui veulent industrialiser.",
        tags: ["CRM", "Teams"],
      },
      {
        name: "Zapier",
        kind: "Automation",
        logo: "Z",
        desc: "Automatise des workflows sans code.",
        tags: ["No-code", "Automations"],
      },
      {
        name: "Framer",
        kind: "Web",
        logo: "F",
        desc: "Crée des demos et landing pages en quelques minutes.",
        tags: ["Web", "Templates"],
      },
    ],
  },
  en: {
    badge: "Integrations",
    title: "Works with your tools",
    subtitle: "Start simple (CSV) and grow into a full stack when needed.",
    items: [
      {
        name: "Google Maps",
        kind: "Source",
        logo: "GM",
        desc: "Local discovery and presence signals.",
        tags: ["Local", "Maps", "Reviews"],
      },
      {
        name: "Gmail",
        kind: "Outreach",
        logo: "G",
        desc: "Draft emails and keep conversations organized.",
        tags: ["Email", "Templates"],
      },
      {
        name: "Notion",
        kind: "Light CRM",
        logo: "N",
        desc: "Simple lead tracking and statuses.",
        tags: ["Pipeline", "Docs"],
      },
      {
        name: "HubSpot",
        kind: "CRM",
        logo: "HS",
        desc: "For teams scaling operations.",
        tags: ["CRM", "Teams"],
      },
      {
        name: "Zapier",
        kind: "Automation",
        logo: "Z",
        desc: "Automate workflows without code.",
        tags: ["No-code", "Automations"],
      },
      {
        name: "Framer",
        kind: "Web",
        logo: "F",
        desc: "Build demos and landing pages fast.",
        tags: ["Web", "Templates"],
      },
    ],
  },
  de: {
    badge: "Integrationen",
    title: "Funktioniert mit deinen Tools",
    subtitle: "Starte einfach (CSV) und erweitere bei Bedarf.",
    items: [
      {
        name: "Google Maps",
        kind: "Quelle",
        logo: "GM",
        desc: "Lokale Discovery und Präsenz-Signale.",
        tags: ["Local", "Maps", "Reviews"],
      },
      {
        name: "Gmail",
        kind: "Outreach",
        logo: "G",
        desc: "E-Mails vorbereiten und Gespräche organisieren.",
        tags: ["Email", "Templates"],
      },
      {
        name: "Notion",
        kind: "Leichtes CRM",
        logo: "N",
        desc: "Einfaches Lead-Tracking.",
        tags: ["Pipeline", "Docs"],
      },
      {
        name: "HubSpot",
        kind: "CRM",
        logo: "HS",
        desc: "Für Teams, die skalieren wollen.",
        tags: ["CRM", "Teams"],
      },
      {
        name: "Zapier",
        kind: "Automation",
        logo: "Z",
        desc: "Workflows ohne Code automatisieren.",
        tags: ["No-code", "Automations"],
      },
      {
        name: "Framer",
        kind: "Web",
        logo: "F",
        desc: "Demos und Landing Pages schnell bauen.",
        tags: ["Web", "Templates"],
      },
    ],
  },
  it: {
    badge: "Integrazioni",
    title: "Compatibile con i tuoi strumenti",
    subtitle: "Inizia semplice (CSV) e cresci quando serve.",
    items: [
      {
        name: "Google Maps",
        kind: "Fonte",
        logo: "GM",
        desc: "Scoperta locale e segnali di presenza.",
        tags: ["Local", "Maps", "Reviews"],
      },
      {
        name: "Gmail",
        kind: "Outreach",
        logo: "G",
        desc: "Scrivi email e organizza le conversazioni.",
        tags: ["Email", "Templates"],
      },
      {
        name: "Notion",
        kind: "CRM leggero",
        logo: "N",
        desc: "Tracking semplice dei lead.",
        tags: ["Pipeline", "Docs"],
      },
      {
        name: "HubSpot",
        kind: "CRM",
        logo: "HS",
        desc: "Per team che scalano.",
        tags: ["CRM", "Teams"],
      },
      {
        name: "Zapier",
        kind: "Automation",
        logo: "Z",
        desc: "Automatizza workflow senza codice.",
        tags: ["No-code", "Automations"],
      },
      {
        name: "Framer",
        kind: "Web",
        logo: "F",
        desc: "Costruisci demo e landing velocemente.",
        tags: ["Web", "Templates"],
      },
    ],
  },
};
