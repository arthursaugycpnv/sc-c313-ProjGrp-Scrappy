"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";

import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuditWidget } from "@/features/home/audit-widget";

export function HomePage() {
  const locale = useLocale() as "fr" | "en" | "de" | "it";
  const t = copy[locale];

  return (
    <div>
      <Hero locale={locale} t={t} />
      <Section id="feature" className="pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {t.featureCards.map((c) => (
            <Card key={c.title}>
              <div className="text-sm font-semibold">{c.title}</div>
              <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">
                {c.desc}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t.how.title}
            </h2>
            <p className="mt-3 text-[rgb(var(--foreground))]/70">
              {t.how.subtitle}
            </p>
            <div className="mt-6 grid gap-3">
              {t.how.steps.map((s) => (
                <div
                  key={s.k}
                  className="flex gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4"
                >
                  <div className="mt-0.5 size-8 shrink-0 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400" />
                  <div>
                    <div className="text-sm font-semibold">{s.k}</div>
                    <div className="text-sm text-[rgb(var(--foreground))]/70">
                      {s.v}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[rgb(var(--border))] bg-gradient-to-b from-[rgb(var(--card))] to-[rgb(var(--card))]/60 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">{t.preview.title}</div>
              <Badge>{t.preview.badge}</Badge>
            </div>
            <div className="mt-4 grid gap-3">
              {t.preview.rows.map((r) => (
                <div
                  key={r.name}
                  className="flex items-center justify-between rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]/40 px-4 py-3"
                >
                  <div>
                    <div className="text-sm font-medium">{r.name}</div>
                    <div className="text-xs text-[rgb(var(--foreground))]/70">
                      {r.note}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-foreground/80">
                    {r.score}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[rgb(var(--foreground))]/70">
              {t.preview.caption}
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t.audit.title}
            </h2>
            <p className="mt-3 text-[rgb(var(--foreground))]/70">
              {t.audit.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-[rgb(var(--foreground))]/70">
              {t.audit.pills.map((p: string) => (
                <span
                  key={p}
                  className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--background))]/60 px-3 py-1"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div>
            <AuditWidget />
          </div>
        </div>
      </Section>

      <Section className="pb-20">
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-brand-500/10 via-cyan-400/10 to-transparent p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                {t.cta.title}
              </h3>
              <p className="mt-2 text-[rgb(var(--foreground))]/70">
                {t.cta.subtitle}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/pricing`}
                className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background hover:opacity-90"
              >
                {t.cta.primary}
              </Link>
              <Link
                href={`/${locale}/demo`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-[rgb(var(--border))] px-5 text-sm font-medium hover:bg-[rgb(var(--muted))]"
              >
                {t.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Hero({ locale, t }: { locale: string; t: unknown }) {
  type HeroMockItem = {
    name: string;
    score: string;
    reason: string;
    tags: string[];
  };

  type HomeCopy = {
    hero: {
      badge: string;
      title1: string;
      title2: string;
      subtitle: string;
      primary: string;
      secondary: string;
      pills: string[];
    };
    heroMock: { title: string; hint: string; items: HeroMockItem[] };
    featureCards: { title: string; desc: string }[];
    how: { title: string; subtitle: string; steps: { k: string; v: string }[] };
    preview: {
      title: string;
      badge: string;
      rows: { name: string; note: string; score: string }[];
      caption: string;
    };
    audit: { title: string; subtitle: string; pills: string[] };
    cta: {
      title: string;
      subtitle: string;
      primary: string;
      secondary: string;
    };
  };

  const tt = t as HomeCopy;

  return (
    <section className="relative overflow-hidden">
      <Glow />
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge>{tt.hero.badge}</Badge>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                {tt.hero.title1}
                <span className="bg-gradient-to-r from-brand-500 to-cyan-400 bg-clip-text text-transparent">
                  {" "}
                  {tt.hero.title2}
                </span>
              </h1>
              <p className="mt-4 text-lg text-[rgb(var(--foreground))]/70">
                {tt.hero.subtitle}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/pricing`}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background hover:opacity-90"
                >
                  {tt.hero.primary}
                </Link>
                <Link
                  href={`/${locale}/features`}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[rgb(var(--border))] px-5 text-sm font-medium hover:bg-[rgb(var(--muted))]"
                >
                  {tt.hero.secondary}
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-[rgb(var(--foreground))]/70">
                {tt.hero.pills.map((p: string) => (
                  <span
                    key={p}
                    className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--background))]/60 px-3 py-1"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl border border-[rgb(var(--border))] bg-gradient-to-b from-[rgb(var(--card))] to-[rgb(var(--card))]/50 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{tt.heroMock.title}</div>
                <span className="text-xs text-[rgb(var(--foreground))]/70">
                  {tt.heroMock.hint}
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {tt.heroMock.items.map((it: HeroMockItem) => (
                  <div
                    key={it.name}
                    className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]/50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{it.name}</div>
                      <div className="text-xs font-semibold">{it.score}</div>
                    </div>
                    <div className="mt-2 text-xs text-[rgb(var(--foreground))]/70">
                      {it.reason}
                    </div>
                    <div className="mt-3 flex gap-2">
                      {it.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[rgb(var(--muted))] px-2 py-1 text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const copy = {
  fr: {
    hero: {
      badge: "Nouveau · Prospection IA pour indépendants",
      title1: "Trouvez des entreprises locales",
      title2: "qui ont vraiment besoin de vous",
      subtitle:
        "Décrivez votre cible, scannez le marché, et récupérez des leads avec un vrai signal d'achat (site lent, absent, fiches incomplètes…).",
      primary: "Voir les tarifs",
      secondary: "Découvrir les fonctionnalités",
      pills: [
        "Scraping local",
        "Scoring opportunités",
        "Exports CSV",
        "Suivi prospection",
      ],
    },
    heroMock: {
      title: "Aperçu de votre pipeline",
      hint: "exemple",
      items: [
        {
          name: "Studio Rénovation · Lausanne",
          score: "Score 92",
          reason: "Site absent, fiche Google active, avis récents",
          tags: ["Sans site", "Appel facile", "Budget probable"],
        },
        {
          name: "Plomberie Rapid · Montreux",
          score: "Score 86",
          reason: "Site lent, pas de formulaire, forte concurrence",
          tags: ["Site lent", "Prioritaire", "Pitch web"],
        },
        {
          name: "Dentiste Nova · Yverdon",
          score: "Score 78",
          reason: "Site ok mais UX faible, avis inégaux",
          tags: ["Refonte", "Suivi", "Email"],
        },
      ],
    },
    featureCards: [
      {
        title: "Découverte instantanée",
        desc: "Trouvez des niches + villes en quelques secondes, sans tableurs ni recherches manuelles.",
      },
      {
        title: "Scoring “closing-friendly”",
        desc: "On met en avant les leads les plus faciles à convertir (problèmes visibles, urgences, signaux d'achat).",
      },
      {
        title: "Pitch prêt à envoyer",
        desc: "Générez un angle de message et un plan d’audit en 1 clic pour démarrer la conversation.",
      },
    ],
    how: {
      title: "Une méthode simple, utilisée par les meilleurs closers",
      subtitle:
        "Une boucle en 3 étapes pour passer de “je cherche des leads” à “j’ai des RDV dans mon calendrier”.",
      steps: [
        { k: "1) Décrire", v: "Niche, zone, taille. Définissez votre radar." },
        {
          k: "2) Analyser",
          v: "Sites, avis, présence en ligne. On détecte les failles.",
        },
        {
          k: "3) Convertir",
          v: "Contacts, script, suivi. Vous exécutez, on accélère.",
        },
      ],
    },
    preview: {
      title: "Ciblage + scoring (exemple)",
      badge: "Live-like",
      rows: [
        {
          name: "Couvreurs · Genève",
          note: "Focus “site absent”",
          score: "↑ Fort potentiel",
        },
        {
          name: "Coiffeurs · Sion",
          note: "Avis récents, site lent",
          score: "↑ Opportunité",
        },
        {
          name: "Avocats · Fribourg",
          note: "Présence moyenne",
          score: "→ À tester",
        },
      ],
      caption:
        "Données fictives et anonymisées. Le but est de montrer la logique UX.",
    },
    audit: {
      title: "Teste l'expérience produit en 30 secondes",
      subtitle:
        "Un mini-audit interactif pour illustrer comment LeadForge AI priorise les opportunités et propose un angle de message.",
      pills: ["Scoring", "Pitch", "Next steps"],
    },
    cta: {
      title: "Passez de la recherche à la prospection en 10 minutes",
      subtitle:
        "Créez votre première liste, classez les meilleures opportunités, exportez et contactez.",
      primary: "Démarrer maintenant",
      secondary: "Voir une démo",
    },
  },
  en: {
    hero: {
      badge: "New · AI prospecting for independents",
      title1: "Find local businesses",
      title2: "that truly need you",
      subtitle:
        "Describe your target, scan the market, and get leads with real buying signals (missing/slow sites, incomplete listings…).",
      primary: "See pricing",
      secondary: "Explore features",
      pills: [
        "Local scraping",
        "Opportunity scoring",
        "CSV exports",
        "Outreach tracking",
      ],
    },
    heroMock: {
      title: "Your pipeline preview",
      hint: "example",
      items: [
        {
          name: "Renovation Studio · Lausanne",
          score: "Score 92",
          reason: "No website, active Google listing, recent reviews",
          tags: ["No site", "Easy call", "Likely budget"],
        },
        {
          name: "Rapid Plumbing · Montreux",
          score: "Score 86",
          reason: "Slow site, no form, high competition",
          tags: ["Slow site", "High priority", "Website pitch"],
        },
        {
          name: "Nova Dentist · Yverdon",
          score: "Score 78",
          reason: "Okay site but weak UX, mixed reviews",
          tags: ["Redesign", "Follow-up", "Email"],
        },
      ],
    },
    featureCards: [
      {
        title: "Instant discovery",
        desc: "Find niches + cities in seconds. No spreadsheets, no manual browsing.",
      },
      {
        title: "Closing-friendly scoring",
        desc: "We highlight leads that are easiest to convert—visible pain, urgency, signals.",
      },
      {
        title: "Pitch-ready angle",
        desc: "Generate a message angle and mini-audit plan in one click to start the conversation.",
      },
    ],
    how: {
      title: "A simple loop used by top closers",
      subtitle:
        "Three steps to go from “I need leads” to “I have meetings booked”.",
      steps: [
        { k: "1) Describe", v: "Niche, area, size. Define your radar." },
        { k: "2) Analyze", v: "Websites, reviews, presence. We detect gaps." },
        {
          k: "3) Convert",
          v: "Contacts, scripts, tracking. You execute, we speed it up.",
        },
      ],
    },
    preview: {
      title: "Targeting + scoring (example)",
      badge: "Live-like",
      rows: [
        {
          name: "Roofers · Geneva",
          note: "Focus “no website”",
          score: "↑ High intent",
        },
        {
          name: "Hair salons · Sion",
          note: "Recent reviews, slow site",
          score: "↑ Opportunity",
        },
        {
          name: "Law firms · Fribourg",
          note: "Average presence",
          score: "→ Test",
        },
      ],
      caption: "Fictional, anonymized data—meant to illustrate the UX logic.",
    },
    audit: {
      title: "Try the product feel in 30 seconds",
      subtitle:
        "A lightweight interactive audit that shows how LeadForge AI prioritizes opportunities and suggests an outreach angle.",
      pills: ["Scoring", "Pitch", "Next steps"],
    },
    cta: {
      title: "From research to outreach in 10 minutes",
      subtitle:
        "Create your first list, rank opportunities, export, and contact.",
      primary: "Start now",
      secondary: "See a demo",
    },
  },
  de: {
    hero: {
      badge: "Neu · KI-Akquise für Selbstständige",
      title1: "Finde lokale Unternehmen",
      title2: "die dich wirklich brauchen",
      subtitle:
        "Beschreibe dein Ziel, scanne den Markt und erhalte Leads mit echten Kaufsignalen (fehlende/langsame Websites, unvollständige Profile…).",
      primary: "Preise ansehen",
      secondary: "Funktionen entdecken",
      pills: [
        "Lokales Scraping",
        "Opportunity-Scoring",
        "CSV-Export",
        "Outreach-Tracking",
      ],
    },
    heroMock: {
      title: "Pipeline-Vorschau",
      hint: "Beispiel",
      items: [
        {
          name: "Renovation Studio · Lausanne",
          score: "Score 92",
          reason: "Keine Website, aktives Google-Profil, neue Bewertungen",
          tags: ["Ohne Website", "Einfacher Anruf", "Wahrsch. Budget"],
        },
        {
          name: "Rapid Plumbing · Montreux",
          score: "Score 86",
          reason: "Langsame Website, kein Formular, hohe Konkurrenz",
          tags: ["Langsam", "Priorität", "Web-Pitch"],
        },
        {
          name: "Nova Dentist · Yverdon",
          score: "Score 78",
          reason: "OK-Website aber schwache UX, gemischte Reviews",
          tags: ["Redesign", "Follow-up", "E-Mail"],
        },
      ],
    },
    featureCards: [
      {
        title: "Sofortige Discovery",
        desc: "Nischen + Städte in Sekunden. Keine Tabellen, kein manuelles Suchen.",
      },
      {
        title: "Closing-freundliches Scoring",
        desc: "Wir priorisieren Leads mit sichtbarem Pain, Dringlichkeit und Signalen.",
      },
      {
        title: "Pitch-fertiger Angle",
        desc: "Message-Angle + Mini-Audit in 1 Klick, um Gespräche zu starten.",
      },
    ],
    how: {
      title: "Ein einfacher Loop wie bei Top-Closern",
      subtitle:
        "Drei Schritte von „Ich brauche Leads“ zu „Meetings im Kalender“.",
      steps: [
        { k: "1) Beschreiben", v: "Nische, Region, Größe. Dein Radar." },
        {
          k: "2) Analysieren",
          v: "Websites, Bewertungen, Präsenz. Wir finden Lücken.",
        },
        {
          k: "3) Konvertieren",
          v: "Kontakte, Skripte, Tracking. Du führst aus, wir beschleunigen.",
        },
      ],
    },
    preview: {
      title: "Targeting + Scoring (Beispiel)",
      badge: "Live-like",
      rows: [
        {
          name: "Dachdecker · Genf",
          note: 'Fokus „keine Website"',
          score: "↑ Hoch",
        },
        {
          name: "Friseure · Sion",
          note: "Neue Reviews, langsame Site",
          score: "↑ Chance",
        },
        { name: "Kanzleien · Freiburg", note: "Ø Präsenz", score: "→ Test" },
      ],
      caption: "Fiktive, anonymisierte Daten — zur Illustration der UX-Logik.",
    },
    audit: {
      title: "Produktgefühl in 30 Sekunden testen",
      subtitle:
        "Ein kleines interaktives Audit zeigt, wie LeadForge AI Chancen priorisiert und einen Outreach-Winkel vorschlägt.",
      pills: ["Scoring", "Pitch", "Next steps"],
    },
    cta: {
      title: "Von Recherche zu Outreach in 10 Minuten",
      subtitle:
        "Erste Liste erstellen, Opportunities ranken, exportieren und kontaktieren.",
      primary: "Jetzt starten",
      secondary: "Demo ansehen",
    },
  },
  it: {
    hero: {
      badge: "Novità · Prospezione IA per indipendenti",
      title1: "Trova aziende locali",
      title2: "che hanno davvero bisogno di te",
      subtitle:
        "Descrivi il target, scansiona il mercato e ottieni lead con veri segnali d’acquisto (siti mancanti/lenti, schede incomplete…).",
      primary: "Vedi prezzi",
      secondary: "Scopri le funzionalità",
      pills: [
        "Scraping locale",
        "Scoring opportunità",
        "Export CSV",
        "Tracking outreach",
      ],
    },
    heroMock: {
      title: "Anteprima pipeline",
      hint: "esempio",
      items: [
        {
          name: "Renovation Studio · Lausanne",
          score: "Score 92",
          reason: "Sito assente, scheda Google attiva, recensioni recenti",
          tags: ["Senza sito", "Chiamata facile", "Budget probabile"],
        },
        {
          name: "Rapid Plumbing · Montreux",
          score: "Score 86",
          reason: "Sito lento, nessun form, alta competizione",
          tags: ["Sito lento", "Priorità", "Pitch web"],
        },
        {
          name: "Nova Dentist · Yverdon",
          score: "Score 78",
          reason: "Sito ok ma UX debole, recensioni miste",
          tags: ["Restyling", "Follow-up", "Email"],
        },
      ],
    },
    featureCards: [
      {
        title: "Scoperta istantanea",
        desc: "Niche + città in pochi secondi. Niente fogli Excel, niente ricerca manuale.",
      },
      {
        title: "Scoring orientato alla chiusura",
        desc: "Mettiamo in evidenza i lead più facili da convertire (pain visibile, urgenza).",
      },
      {
        title: "Pitch pronto",
        desc: "Genera un angolo di messaggio e un mini-audit in 1 click.",
      },
    ],
    how: {
      title: "Un loop semplice usato dai migliori closer",
      subtitle:
        "Tre step per passare da “mi servono lead” a “ho meeting in calendario”.",
      steps: [
        { k: "1) Descrivi", v: "Niche, zona, dimensione. Definisci il radar." },
        {
          k: "2) Analizza",
          v: "Siti, recensioni, presenza. Individuiamo i gap.",
        },
        {
          k: "3) Converte",
          v: "Contatti, script, tracking. Tu esegui, noi acceleriamo.",
        },
      ],
    },
    preview: {
      title: "Targeting + scoring (esempio)",
      badge: "Live-like",
      rows: [
        {
          name: "Tetti · Ginevra",
          note: "Focus “sito assente”",
          score: "↑ Alto",
        },
        {
          name: "Parrucchieri · Sion",
          note: "Recensioni recenti, sito lento",
          score: "↑ Opportunità",
        },
        {
          name: "Studi legali · Friburgo",
          note: "Presenza media",
          score: "→ Test",
        },
      ],
      caption: "Dati fittizi e anonimizzati — per mostrare la logica UX.",
    },
    audit: {
      title: "Prova l'esperienza prodotto in 30 secondi",
      subtitle:
        "Un mini audit interattivo per mostrare come LeadForge AI prioritizza le opportunità e suggerisce un angolo di outreach.",
      pills: ["Scoring", "Pitch", "Next steps"],
    },
    cta: {
      title: "Dalla ricerca all’outreach in 10 minuti",
      subtitle:
        "Crea la prima lista, ordina le opportunità, esporta e contatta.",
      primary: "Inizia ora",
      secondary: "Guarda la demo",
    },
  },
};
