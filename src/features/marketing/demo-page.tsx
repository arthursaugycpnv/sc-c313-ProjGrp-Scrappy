"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DemoPage() {
  const locale = useLocale() as "fr" | "en" | "de" | "it";
  const t = copy[locale];
  const youtubeUrl = "https://www.youtube.com/watch?v=TopjEiuA-8w";
  const youtubeEmbedUrl = "https://www.youtube.com/embed/TopjEiuA-8w";

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
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <Card>
            <div className="text-sm font-semibold">{t.walkthrough.title}</div>
            <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">
              {t.walkthrough.desc}
            </p>
            <div className="mt-5 grid gap-3">
              {t.walkthrough.steps.map((s: { k: string; v: string }) => (
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
          </Card>

          <Card>
            <div className="text-sm font-semibold">{t.video.title}</div>
            <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">
              {t.video.desc}
            </p>
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--muted))]">
              <iframe
                className="h-full w-full"
                src={youtubeEmbedUrl}
                title="Demo video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="mt-3 text-xs text-[rgb(var(--foreground))]/60">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {t.video.watchOnYoutube}
              </a>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/pricing`}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background hover:opacity-90"
              >
                {t.video.primary}
              </Link>
              <Link
                href={`/${locale}/features`}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-[rgb(var(--border))] px-5 text-sm font-medium hover:bg-[rgb(var(--muted))]"
              >
                {t.video.secondary}
              </Link>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}

const copy = {
  fr: {
    badge: "Démo",
    title: "Voir la logique produit (sans bullshit)",
    subtitle:
      "Une démo courte et claire: comment tu passes d’une niche à une liste de leads priorisés, puis à l’outreach.",
    walkthrough: {
      title: "Walkthrough",
      desc: "Une approche “do the thing” — idéal pour étudiants et débutants.",
      steps: [
        {
          k: "1) Choisis une niche",
          v: "Ex: plombiers, couvreurs, salons, dentistes.",
        },
        { k: "2) Choisis une ville", v: "Ex: Lausanne, Genève, Montreux." },
        {
          k: "3) Lance le scan",
          v: "On détecte les faiblesses visibles et on score.",
        },
        { k: "4) Contacte", v: "Script + audit rapide + suivi." },
      ],
    },
    video: {
      title: "Vidéo",
      desc: "Démo YouTube intégrée.",
      watchOnYoutube: "Regarder sur YouTube",
      primary: "Voir les tarifs",
      secondary: "Voir les fonctionnalités",
    },
  },
  en: {
    badge: "Demo",
    title: "See the product logic (no fluff)",
    subtitle: "A short demo: from niche → prioritized leads → outreach.",
    walkthrough: {
      title: "Walkthrough",
      desc: "A “do the thing” approach—great for students and beginners.",
      steps: [
        { k: "1) Pick a niche", v: "Plumbers, roofers, salons, dentists…" },
        { k: "2) Pick a city", v: "Lausanne, Geneva, Montreux…" },
        { k: "3) Run the scan", v: "We detect visible gaps and score." },
        { k: "4) Reach out", v: "Script + quick audit + tracking." },
      ],
    },
    video: {
      title: "Video",
      desc: "Embedded YouTube demo.",
      watchOnYoutube: "Watch on YouTube",
      primary: "See pricing",
      secondary: "Explore features",
    },
  },
  de: {
    badge: "Demo",
    title: "Produktlogik sehen (ohne Fluff)",
    subtitle: "Kurze Demo: Nische → priorisierte Leads → Outreach.",
    walkthrough: {
      title: "Walkthrough",
      desc: "“Do the thing” — ideal für Studierende und Einsteiger.",
      steps: [
        {
          k: "1) Nische wählen",
          v: "Z.B. Klempner, Dachdecker, Salons, Zahnärzte.",
        },
        { k: "2) Stadt wählen", v: "Lausanne, Genf, Montreux…" },
        { k: "3) Scan starten", v: "Wir erkennen Lücken und bewerten." },
        { k: "4) Kontakt", v: "Skript + Mini-Audit + Tracking." },
      ],
    },
    video: {
      title: "Video",
      desc: "Eingebettete YouTube-Demo.",
      watchOnYoutube: "Auf YouTube ansehen",
      primary: "Preise ansehen",
      secondary: "Funktionen",
    },
  },
  it: {
    badge: "Demo",
    title: "Vedi la logica prodotto (senza fuffa)",
    subtitle: "Demo breve: nicchia → lead prioritizzati → outreach.",
    walkthrough: {
      title: "Walkthrough",
      desc: "Approccio “fai la cosa” — ottimo per studenti e principianti.",
      steps: [
        {
          k: "1) Scegli una nicchia",
          v: "Idraulici, tetti, saloni, dentisti…",
        },
        { k: "2) Scegli una città", v: "Losanna, Ginevra, Montreux…" },
        { k: "3) Avvia lo scan", v: "Individuiamo gap e facciamo scoring." },
        { k: "4) Contatta", v: "Script + mini-audit + tracking." },
      ],
    },
    video: {
      title: "Video",
      desc: "Demo YouTube incorporata.",
      watchOnYoutube: "Guarda su YouTube",
      primary: "Vedi prezzi",
      secondary: "Funzionalità",
    },
  },
};
