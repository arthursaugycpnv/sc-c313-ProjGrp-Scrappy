"use client";

import { useLocale } from "next-intl";

import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export function TermsPage() {
  const locale = useLocale() as "fr" | "en" | "de" | "it";
  const t = copy[locale];

  return (
    <div>
      <Section>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[rgb(var(--foreground))]/70">
          {t.subtitle}
        </p>
      </Section>

      <Section className="pt-0">
        <Card>
          <div className="max-w-none text-[rgb(var(--foreground))]">
            <p className="text-[rgb(var(--foreground))]/70">{t.note}</p>
            <h2>{t.sections.service.title}</h2>
            <p className="text-[rgb(var(--foreground))]/70">
              {t.sections.service.body}
            </p>
            <h2>{t.sections.acceptable.title}</h2>
            <p className="text-[rgb(var(--foreground))]/70">
              {t.sections.acceptable.body}
            </p>
            <h2>{t.sections.billing.title}</h2>
            <p className="text-[rgb(var(--foreground))]/70">
              {t.sections.billing.body}
            </p>
            <h2>{t.sections.liability.title}</h2>
            <p className="text-[rgb(var(--foreground))]/70">
              {t.sections.liability.body}
            </p>
          </div>
        </Card>
      </Section>
    </div>
  );
}

const copy = {
  fr: {
    title: "Conditions d’utilisation",
    subtitle:
      "Document placeholder à personnaliser. À faire valider si tu lances un SaaS.",
    note: "Ceci n’est pas un conseil juridique.",
    sections: {
      service: {
        title: "Le service",
        body: "LeadForge AI fournit des outils d’aide à la prospection et à l’analyse. Les résultats peuvent varier.",
      },
      acceptable: {
        title: "Usage acceptable",
        body: "Interdiction d’usages illégaux, spam massif, ou violation de droits.",
      },
      billing: {
        title: "Paiement",
        body: "Les abonnements, essais et annulations doivent être précisés selon ton modèle.",
      },
      liability: {
        title: "Responsabilité",
        body: "Le service est fourni “en l’état”. Limitation de responsabilité à adapter.",
      },
    },
  },
  en: {
    title: "Terms of Use",
    subtitle:
      "Placeholder document. Customize and review for a real SaaS launch.",
    note: "Not legal advice.",
    sections: {
      service: {
        title: "The service",
        body: "LeadForge AI provides prospecting and analysis tools. Results may vary.",
      },
      acceptable: {
        title: "Acceptable use",
        body: "No illegal use, bulk spam, or rights violations.",
      },
      billing: {
        title: "Billing",
        body: "Subscriptions, trials, and cancellations should be defined per your model.",
      },
      liability: {
        title: "Liability",
        body: "Provided “as is”. Liability limitations should be adjusted.",
      },
    },
  },
  de: {
    title: "Nutzungsbedingungen",
    subtitle:
      "Placeholder. Für einen echten SaaS-Launch anpassen und prüfen lassen.",
    note: "Kein Rechtsrat.",
    sections: {
      service: {
        title: "Service",
        body: "LeadForge AI bietet Tools für Akquise und Analyse. Ergebnisse können variieren.",
      },
      acceptable: {
        title: "Zulässige Nutzung",
        body: "Keine illegalen Zwecke, kein Massen-Spam, keine Rechteverletzung.",
      },
      billing: {
        title: "Zahlung",
        body: "Abos, Testphasen und Kündigungen entsprechend definieren.",
      },
      liability: {
        title: "Haftung",
        body: "“As is”. Haftungsbegrenzung anpassen.",
      },
    },
  },
  it: {
    title: "Termini d’uso",
    subtitle:
      "Documento placeholder. Personalizza e fai revisionare per un SaaS reale.",
    note: "Non è consulenza legale.",
    sections: {
      service: {
        title: "Il servizio",
        body: "LeadForge AI offre strumenti di prospezione e analisi. I risultati possono variare.",
      },
      acceptable: {
        title: "Uso accettabile",
        body: "Niente usi illegali, spam massivo o violazioni di diritti.",
      },
      billing: {
        title: "Pagamenti",
        body: "Abbonamenti, prove e cancellazioni vanno definiti sul tuo modello.",
      },
      liability: {
        title: "Responsabilità",
        body: "Fornito “così com’è”. Limiti da adattare.",
      },
    },
  },
};
