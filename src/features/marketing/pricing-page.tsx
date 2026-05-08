"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const blueCard =
  "border-brand-500/25 bg-gradient-to-br from-brand-500/10 via-[rgb(var(--card))] to-cyan-400/10 transition-all duration-200 ease-out hover:border-brand-500/35 hover:shadow-lg hover:shadow-brand-500/10 hover:-translate-y-0.5 hover:scale-[1.02]";

export function PricingPage() {
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
        <div className="grid gap-6 md:grid-cols-3">
          {t.plans.map((p) => (
            <Card
              key={p.name}
              className={cn(blueCard, p.highlight ? "relative" : undefined)}
            >
              {p.highlight ? (
                <div className="absolute -top-3 right-6 rounded-full bg-[rgb(var(--brand-500))] px-3 py-1 text-xs font-semibold text-white">
                  {t.mostPopular}
                </div>
              ) : null}
              <div className="text-sm font-semibold">{p.name}</div>
              <div className="mt-2 text-4xl font-semibold tracking-tight">
                {p.price}
                <span className="text-base font-medium text-[rgb(var(--foreground))]/60">
                  {t.perMonth}
                </span>
              </div>
              <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">
                {p.desc}
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f: string) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-0.5 inline-block size-4 rounded bg-[rgb(var(--brand-500))]/15" />
                    <span className="text-[rgb(var(--foreground))]/80">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/contact`}
                className={
                  p.highlight
                    ? "mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background hover:opacity-90"
                    : "mt-6 inline-flex h-11 w-full items-center justify-center rounded-full border border-[rgb(var(--border))] px-5 text-sm font-medium hover:bg-[rgb(var(--muted))]"
                }
              >
                {p.cta}
              </Link>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-xs text-[rgb(var(--foreground))]/60">
          {t.disclaimer}
        </p>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {t.faq.map((q) => (
            <Card key={q.q} className={blueCard}>
              <div className="text-sm font-semibold">{q.q}</div>
              <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">
                {q.a}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

const copy = {
  fr: {
    badge: "Tarifs",
    title: "Un pricing clair. Pas de pièges.",
    subtitle:
      "Choisis un plan selon ton rythme de prospection. Idéal pour freelances, micro-agences et étudiants qui veulent apprendre en faisant.",
    mostPopular: "Le + populaire",
    perMonth: "/mois",
    disclaimer:
      "Ces prix sont des exemples (placeholders). Tu peux les ajuster selon ton business model.",
    plans: [
      {
        name: "Starter",
        price: "19€",
        desc: "Pour tester la prospection IA et créer tes premières listes.",
        highlight: false,
        cta: "Demander un accès",
        features: [
          "Découverte locale basique",
          "Scoring simple",
          "Export CSV",
          "Support email",
        ],
      },
      {
        name: "Pro",
        price: "49€",
        desc: "Pour produire des listes chaque semaine et convertir plus vite.",
        highlight: true,
        cta: "Parler à l’équipe",
        features: [
          "Tous les filtres",
          "Scoring avancé",
          "Templates de scripts",
          "Suivi pipeline",
          "Exports illimités",
        ],
      },
      {
        name: "Agency",
        price: "99€",
        desc: "Pour les agences qui veulent industrialiser la prospection locale.",
        highlight: false,
        cta: "Plan sur mesure",
        features: [
          "Équipe multi-utilisateurs",
          "Workspaces",
          "Priorités support",
          "Intégrations",
          "Onboarding",
        ],
      },
    ],
    faq: [
      {
        q: "Est-ce que j'ai besoin d'expérience en vente ?",
        a: "Non. L'outil réduit la difficulté en te donnant des leads où le problème est visible. Tu apprends plus vite et tu te sens plus confiant.",
      },
      {
        q: "Puis-je exporter mes leads ?",
        a: "Oui. Export CSV (et plus tard: intégrations CRM).",
      },
      {
        q: "Est-ce légal ?",
        a: "On recommande de respecter la loi locale (RGPD, opt-out, etc.). La page “Privacy/Terms” peut être adaptée avec un juriste.",
      },
      {
        q: "En combien de temps je peux démarrer ?",
        a: "En quelques minutes: tu crées ta niche + zone, tu lances une recherche, tu exportes, tu contactes.",
      },
    ],
  },
  en: {
    badge: "Pricing",
    title: "Clear pricing. No tricks.",
    subtitle:
      "Pick a plan based on your outreach cadence. Great for freelancers, small agencies, and students learning by doing.",
    mostPopular: "Most popular",
    perMonth: "/mo",
    disclaimer: "Example placeholder pricing. Adjust to your business model.",
    plans: [
      {
        name: "Starter",
        price: "€19",
        desc: "Try AI prospecting and build your first lists.",
        highlight: false,
        cta: "Request access",
        features: [
          "Basic local discovery",
          "Simple scoring",
          "CSV export",
          "Email support",
        ],
      },
      {
        name: "Pro",
        price: "€49",
        desc: "Produce weekly lists and convert faster.",
        highlight: true,
        cta: "Talk to the team",
        features: [
          "All filters",
          "Advanced scoring",
          "Script templates",
          "Pipeline tracking",
          "Unlimited exports",
        ],
      },
      {
        name: "Agency",
        price: "€99",
        desc: "For agencies scaling local outreach.",
        highlight: false,
        cta: "Custom plan",
        features: [
          "Team seats",
          "Workspaces",
          "Priority support",
          "Integrations",
          "Onboarding",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need sales experience?",
        a: "No. We make it easier by showing leads with visible pain. You learn faster and feel confident.",
      },
      {
        q: "Can I export leads?",
        a: "Yes. CSV export (and later: CRM integrations).",
      },
      {
        q: "Is it legal?",
        a: "Follow local laws (GDPR, opt-out). Terms/Privacy should be reviewed with legal counsel.",
      },
      {
        q: "How fast can I start?",
        a: "Minutes: define niche + area, run a search, export, reach out.",
      },
    ],
  },
  de: {
    badge: "Preise",
    title: "Klare Preise. Keine Tricks.",
    subtitle:
      "Wähle einen Plan passend zu deinem Outreach-Rhythmus. Ideal für Freelancer, kleine Agenturen und Studierende.",
    mostPopular: "Beliebt",
    perMonth: "/Monat",
    disclaimer: "Beispiel-Preise (Placeholder). Anpassbar.",
    plans: [
      {
        name: "Starter",
        price: "19€",
        desc: "KI-Akquise testen und erste Listen bauen.",
        highlight: false,
        cta: "Zugang anfragen",
        features: [
          "Basis-Discovery",
          "Einfaches Scoring",
          "CSV Export",
          "E-Mail Support",
        ],
      },
      {
        name: "Pro",
        price: "49€",
        desc: "Wöchentlich liefern und schneller konvertieren.",
        highlight: true,
        cta: "Team kontaktieren",
        features: [
          "Alle Filter",
          "Advanced Scoring",
          "Skript-Templates",
          "Pipeline-Tracking",
          "Unbegrenzte Exports",
        ],
      },
      {
        name: "Agency",
        price: "99€",
        desc: "Für Agenturen, die lokale Akquise skalieren.",
        highlight: false,
        cta: "Individuell",
        features: [
          "Mehr Nutzer",
          "Workspaces",
          "Priority Support",
          "Integrationen",
          "Onboarding",
        ],
      },
    ],
    faq: [
      {
        q: "Brauche ich Sales-Erfahrung?",
        a: "Nein. Wir zeigen Leads mit sichtbarem Bedarf. Das reduziert Hürden.",
      },
      {
        q: "Kann ich Leads exportieren?",
        a: "Ja. CSV Export (später CRM Integrationen).",
      },
      {
        q: "Ist es legal?",
        a: "Bitte lokale Gesetze beachten (DSGVO, Opt-out).",
      },
      {
        q: "Wie schnell kann ich starten?",
        a: "In Minuten: Ziel definieren, suchen, exportieren, kontaktieren.",
      },
    ],
  },
  it: {
    badge: "Prezzi",
    title: "Prezzi chiari. Nessun trucco.",
    subtitle:
      "Scegli un piano in base al ritmo di outreach. Ottimo per freelance, micro-agenzie e studenti.",
    mostPopular: "Più scelto",
    perMonth: "/mese",
    disclaimer: "Prezzi esempio (placeholder). Modificabili.",
    plans: [
      {
        name: "Starter",
        price: "19€",
        desc: "Prova la prospezione IA e crea le prime liste.",
        highlight: false,
        cta: "Richiedi accesso",
        features: [
          "Scoperta locale base",
          "Scoring semplice",
          "Export CSV",
          "Supporto email",
        ],
      },
      {
        name: "Pro",
        price: "49€",
        desc: "Liste settimanali e conversione più rapida.",
        highlight: true,
        cta: "Parla col team",
        features: [
          "Tutti i filtri",
          "Scoring avanzato",
          "Template script",
          "Tracking pipeline",
          "Export illimitati",
        ],
      },
      {
        name: "Agency",
        price: "99€",
        desc: "Per agenzie che scalano l’outreach locale.",
        highlight: false,
        cta: "Piano custom",
        features: [
          "Multi-utente",
          "Workspaces",
          "Supporto prioritario",
          "Integrazioni",
          "Onboarding",
        ],
      },
    ],
    faq: [
      {
        q: "Serve esperienza commerciale?",
        a: "No. Mostriamo lead con problemi visibili: conversazioni più facili.",
      },
      {
        q: "Posso esportare i lead?",
        a: "Sì. Export CSV (poi integrazioni CRM).",
      },
      {
        q: "È legale?",
        a: "Segui le leggi locali (GDPR, opt-out). Termini/Privacy da rivedere con un legale.",
      },
      {
        q: "Quanto tempo per iniziare?",
        a: "Minuti: definisci target, cerca, esporta e contatta.",
      },
    ],
  },
};
