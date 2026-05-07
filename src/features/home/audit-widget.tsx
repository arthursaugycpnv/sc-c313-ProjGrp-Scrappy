"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useLocale } from "next-intl";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AuditResult = {
  score: number;
  headline: string;
  bullets: string[];
  nextSteps: string[];
};

type Locale = "fr" | "en" | "de" | "it";
type WebsiteState = "unknown" | "missing" | "slow" | "ok";
type ReviewState = "low" | "mid" | "high";

type AuditCopy = {
  title: string;
  subtitle: string;
  badge: string;
  fields: {
    niche: string;
    nichePh: string;
    city: string;
    cityPh: string;
    website: string;
    reviews: string;
  };
  website: Record<WebsiteState, string>;
  reviews: Record<ReviewState, string>;
  resultLabel: string;
  score: string;
  insights: string;
  nextSteps: string;
  disclaimer: string;
  genericBusiness: string;
  genericCity: string;
  headlines: {
    hot: string;
    warm: string;
    cold: string;
  };
  bullets: {
    missing: string;
    slow: string;
    ok: string;
    unknown: string;
    reviewsLow: string;
    reviewsMid: string;
    reviewsHigh: string;
  };
  steps: {
    audit: string;
    pitchNoSite: string;
    pitchSpeed: string;
    pitchUX: string;
    followUp: string;
  };
};

export function AuditWidget() {
  const locale = useLocale() as Locale;
  const t = copy[locale];

  const [niche, setNiche] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState<WebsiteState>("unknown");
  const [reviews, setReviews] = useState<ReviewState>("mid");

  const result = useMemo(() => {
    return computeResult({ locale, niche, city, website, reviews, t });
  }, [locale, niche, city, website, reviews, t]);

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{t.title}</div>
          <p className="mt-1 text-sm text-[rgb(var(--foreground))]/70">
            {t.subtitle}
          </p>
        </div>
        <Badge>{t.badge}</Badge>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <Field label={t.fields.niche}>
          <input
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder={t.fields.nichePh}
            className="h-11 w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]/60 px-4"
          />
        </Field>

        <Field label={t.fields.city}>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t.fields.cityPh}
            className="h-11 w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]/60 px-4"
          />
        </Field>

        <Field label={t.fields.website}>
          <select
            value={website}
            onChange={(e) => setWebsite(e.target.value as WebsiteState)}
            className="h-11 w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]/60 px-4"
          >
            <option value="unknown">{t.website.unknown}</option>
            <option value="missing">{t.website.missing}</option>
            <option value="slow">{t.website.slow}</option>
            <option value="ok">{t.website.ok}</option>
          </select>
        </Field>

        <Field label={t.fields.reviews}>
          <select
            value={reviews}
            onChange={(e) => setReviews(e.target.value as ReviewState)}
            className="h-11 w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))]/60 px-4"
          >
            <option value="low">{t.reviews.low}</option>
            <option value="mid">{t.reviews.mid}</option>
            <option value="high">{t.reviews.high}</option>
          </select>
        </Field>
      </div>

      <motion.div
        key={`${result.score}-${result.headline}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-6 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--muted))] p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]/60">
              {t.resultLabel}
            </div>
            <div className="mt-1 text-lg font-semibold">{result.headline}</div>
          </div>
          <div className="rounded-2xl bg-[rgb(var(--background))]/70 px-4 py-2 text-sm font-semibold">
            {t.score}: {result.score}
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]/60">
              {t.insights}
            </div>
            <ul className="mt-2 space-y-2 text-sm">
              {result.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-0.5 inline-block size-4 rounded bg-[rgb(var(--brand-500))]/15" />
                  <span className="text-[rgb(var(--foreground))]/80">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]/60">
              {t.nextSteps}
            </div>
            <ol className="mt-2 space-y-2 text-sm">
              {result.nextSteps.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="mt-0.5 inline-flex size-4 items-center justify-center rounded bg-[rgb(var(--brand-500))]/15 text-[11px]">
                    →
                  </span>
                  <span className="text-[rgb(var(--foreground))]/80">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="mt-4 text-xs text-[rgb(var(--foreground))]/60">
          {t.disclaimer}
        </p>
      </motion.div>
    </Card>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-[rgb(var(--foreground))]/70">{label}</span>
      {children}
    </label>
  );
}

function computeResult({
  niche,
  city,
  website,
  reviews,
  t,
}: {
  locale: string;
  niche: string;
  city: string;
  website: WebsiteState;
  reviews: ReviewState;
  t: AuditCopy;
}): AuditResult {
  let score = 55;

  if (website === "missing") score += 28;
  if (website === "slow") score += 18;
  if (website === "ok") score -= 8;

  if (reviews === "low") score += 10;
  if (reviews === "high") score -= 6;

  if (niche.trim().length > 2) score += 4;
  if (city.trim().length > 2) score += 4;

  score = Math.max(0, Math.min(99, score));

  const target = [niche || t.genericBusiness, city || t.genericCity].join(
    " · ",
  );
  const headline =
    score >= 85
      ? t.headlines.hot.replace("{target}", target)
      : score >= 70
        ? t.headlines.warm.replace("{target}", target)
        : t.headlines.cold.replace("{target}", target);

  const bullets = [
    website === "missing"
      ? t.bullets.missing
      : website === "slow"
        ? t.bullets.slow
        : website === "ok"
          ? t.bullets.ok
          : t.bullets.unknown,
    reviews === "low"
      ? t.bullets.reviewsLow
      : reviews === "high"
        ? t.bullets.reviewsHigh
        : t.bullets.reviewsMid,
  ];

  const nextSteps = [
    t.steps.audit,
    website === "missing"
      ? t.steps.pitchNoSite
      : website === "slow"
        ? t.steps.pitchSpeed
        : t.steps.pitchUX,
    t.steps.followUp,
  ];

  return { score, headline, bullets, nextSteps };
}

const copy: Record<Locale, AuditCopy> = {
  fr: {
    title: "Audit express (démo)",
    subtitle: "Simule un scoring et reçois un mini-plan d’outreach.",
    badge: "Interactif",
    fields: {
      niche: "Niche",
      nichePh: "Ex: plombiers",
      city: "Ville",
      cityPh: "Ex: Genève",
      website: "Site web",
      reviews: "Avis",
    },
    website: {
      unknown: "Je ne sais pas",
      missing: "Absent",
      slow: "Lent",
      ok: "Correct",
    },
    reviews: { low: "Peu / faibles", mid: "Moyens", high: "Bons" },
    resultLabel: "Résultat",
    score: "Score",
    insights: "Insights",
    nextSteps: "Prochaines actions",
    disclaimer:
      "Résultat fictif: sert à illustrer l’UX. Les règles peuvent être branchées sur de vraies données plus tard.",
    genericBusiness: "Business local",
    genericCity: "Ta ville",
    headlines: {
      hot: "Opportunité chaude: {target}",
      warm: "Opportunité intéressante: {target}",
      cold: "Opportunité à tester: {target}",
    },
    bullets: {
      missing:
        "Signal fort: absence de site → pitch facile (rapidité + crédibilité).",
      slow: "Signal: site lent → argument “perte de clients + SEO”.",
      ok: "Site correct → angle “conversion + différenciation”.",
      unknown: "Site non évalué → commence par une vérification rapide.",
      reviewsLow:
        "Avis faibles: opportunité d’améliorer la confiance (photos, FAQ, pages).",
      reviewsMid: "Avis moyens: marge de progression sur offre + expérience.",
      reviewsHigh:
        "Bons avis: angle “amplifier” (optimiser conversion, ads, landing).",
    },
    steps: {
      audit: "Faire un audit 5 minutes (site + fiche + 3 concurrents).",
      pitchNoSite:
        "Pitch: “Je peux vous mettre en ligne en 7 jours avec une page qui convertit.”",
      pitchSpeed:
        "Pitch: “Votre site perd des leads, je vous propose une optimisation rapide.”",
      pitchUX:
        "Pitch: “Améliorons la conversion: formulaire, CTA, preuve sociale.”",
      followUp: "Ajouter un suivi J+2 et J+7 avec un exemple concret.",
    },
  },
  en: {
    title: "Quick Audit (demo)",
    subtitle: "Simulate scoring and get a mini outreach plan.",
    badge: "Interactive",
    fields: {
      niche: "Niche",
      nichePh: "e.g. plumbers",
      city: "City",
      cityPh: "e.g. Geneva",
      website: "Website",
      reviews: "Reviews",
    },
    website: {
      unknown: "Not sure",
      missing: "Missing",
      slow: "Slow",
      ok: "Okay",
    },
    reviews: { low: "Low", mid: "Average", high: "Good" },
    resultLabel: "Result",
    score: "Score",
    insights: "Insights",
    nextSteps: "Next steps",
    disclaimer:
      "Fictional result to showcase UX. Rules can be wired to real data later.",
    genericBusiness: "Local business",
    genericCity: "Your city",
    headlines: {
      hot: "Hot opportunity: {target}",
      warm: "Promising opportunity: {target}",
      cold: "Test opportunity: {target}",
    },
    bullets: {
      missing: "Strong signal: no site → easy pitch (speed + credibility).",
      slow: "Signal: slow site → angle “lost leads + SEO”.",
      ok: "Okay site → angle “conversion + differentiation”.",
      unknown: "Not evaluated → start with a quick check.",
      reviewsLow: "Low reviews: improve trust (photos, FAQ, pages).",
      reviewsMid: "Average reviews: improve offer + experience.",
      reviewsHigh: "Good reviews: “amplify” angle (conversion, ads, landing).",
    },
    steps: {
      audit: "Run a 5-min audit (site + listing + 3 competitors).",
      pitchNoSite:
        "Pitch: “I can get you online in 7 days with a converting page.”",
      pitchSpeed: "Pitch: “Your site is losing leads—fast optimization plan.”",
      pitchUX: "Pitch: “Improve conversion: form, CTA, social proof.”",
      followUp: "Add follow-ups on day 2 and day 7 with a concrete example.",
    },
  },
  de: {
    title: "Schnell-Audit (Demo)",
    subtitle: "Scoring simulieren und Mini-Outreach-Plan erhalten.",
    badge: "Interaktiv",
    fields: {
      niche: "Nische",
      nichePh: "z.B. Klempner",
      city: "Stadt",
      cityPh: "z.B. Genf",
      website: "Website",
      reviews: "Reviews",
    },
    website: { unknown: "Unklar", missing: "Fehlt", slow: "Langsam", ok: "OK" },
    reviews: { low: "Schwach", mid: "Mittel", high: "Gut" },
    resultLabel: "Ergebnis",
    score: "Score",
    insights: "Insights",
    nextSteps: "Nächste Schritte",
    disclaimer:
      "Fiktives Ergebnis für UX-Demo. Regeln später an echte Daten anschließen.",
    genericBusiness: "Lokales Business",
    genericCity: "Deine Stadt",
    headlines: {
      hot: "Heißer Lead: {target}",
      warm: "Gute Chance: {target}",
      cold: "Test-Chance: {target}",
    },
    bullets: {
      missing: "Starkes Signal: keine Website → leichter Pitch.",
      slow: "Signal: langsame Website → “verlorene Leads + SEO”.",
      ok: "OK-Website → “Conversion + Differenzierung”.",
      unknown: "Nicht bewertet → kurzer Check zuerst.",
      reviewsLow: "Schwache Reviews: Vertrauen verbessern.",
      reviewsMid: "Mittel: Potenzial bei Angebot/Experience.",
      reviewsHigh: "Gut: “Amplify”-Angle (Conversion, Ads, Landing).",
    },
    steps: {
      audit: "5-Min Audit (Website + Listing + 3 Wettbewerber).",
      pitchNoSite: "Pitch: “In 7 Tagen online mit Landing die konvertiert.”",
      pitchSpeed: "Pitch: “Website verliert Leads—schneller Fix.”",
      pitchUX: "Pitch: “Conversion verbessern: CTA, Form, Proof.”",
      followUp: "Follow-ups Tag 2 und Tag 7 mit Beispiel.",
    },
  },
  it: {
    title: "Audit rapido (demo)",
    subtitle: "Simula lo scoring e ottieni un mini piano di outreach.",
    badge: "Interattivo",
    fields: {
      niche: "Nicchia",
      nichePh: "Es: idraulici",
      city: "Città",
      cityPh: "Es: Ginevra",
      website: "Sito",
      reviews: "Recensioni",
    },
    website: { unknown: "Non so", missing: "Assente", slow: "Lento", ok: "Ok" },
    reviews: { low: "Basse", mid: "Medie", high: "Buone" },
    resultLabel: "Risultato",
    score: "Score",
    insights: "Insights",
    nextSteps: "Prossimi passi",
    disclaimer:
      "Risultato fittizio per mostrare UX. Regole collegabili a dati reali in futuro.",
    genericBusiness: "Azienda locale",
    genericCity: "La tua città",
    headlines: {
      hot: "Ottima opportunità: {target}",
      warm: "Buona opportunità: {target}",
      cold: "Opportunità da testare: {target}",
    },
    bullets: {
      missing: "Segnale forte: sito assente → pitch facile.",
      slow: "Segnale: sito lento → “lead persi + SEO”.",
      ok: "Sito ok → “conversione + differenziazione”.",
      unknown: "Non valutato → fai un check rapido.",
      reviewsLow: "Recensioni basse: migliora la fiducia.",
      reviewsMid: "Medie: margine su offerta/esperienza.",
      reviewsHigh: "Buone: amplifica (conversione, ads, landing).",
    },
    steps: {
      audit: "Audit 5 minuti (sito + scheda + 3 competitor).",
      pitchNoSite: "Pitch: “Online in 7 giorni con landing che converte.”",
      pitchSpeed: "Pitch: “Il sito perde lead—ottimizzazione veloce.”",
      pitchUX: "Pitch: “Miglioriamo conversione: CTA, form, proof.”",
      followUp: "Follow-up giorno 2 e 7 con esempio concreto.",
    },
  },
};
