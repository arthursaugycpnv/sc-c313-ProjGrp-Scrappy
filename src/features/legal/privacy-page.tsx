"use client";

import { useLocale } from "next-intl";

import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export function PrivacyPage() {
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
            <h2>{t.sections.collect.title}</h2>
            <p className="text-[rgb(var(--foreground))]/70">
              {t.sections.collect.body}
            </p>
            <h2>{t.sections.use.title}</h2>
            <p className="text-[rgb(var(--foreground))]/70">
              {t.sections.use.body}
            </p>
            <h2>{t.sections.cookies.title}</h2>
            <p className="text-[rgb(var(--foreground))]/70">
              {t.sections.cookies.body}
            </p>
            <h2>{t.sections.rights.title}</h2>
            <p className="text-[rgb(var(--foreground))]/70">
              {t.sections.rights.body}
            </p>
          </div>
        </Card>
      </Section>
    </div>
  );
}

const copy = {
  fr: {
    title: "Politique de confidentialité",
    subtitle:
      "Document placeholder à personnaliser selon ton produit et ta conformité (RGPD etc.).",
    note: "Ceci n’est pas un conseil juridique. Fais valider par un professionnel.",
    sections: {
      collect: {
        title: "Données collectées",
        body: "Email, informations de contact, et données d’usage (ex: pages visitées).",
      },
      use: {
        title: "Utilisation",
        body: "Répondre aux demandes, améliorer le produit, et garantir la sécurité.",
      },
      cookies: {
        title: "Cookies",
        body: "Cookies techniques + éventuellement analytics. Ajouter un bandeau si nécessaire.",
      },
      rights: {
        title: "Vos droits",
        body: "Accès, rectification, suppression. Contact: privacy@leadforge.ai (placeholder).",
      },
    },
  },
  en: {
    title: "Privacy Policy",
    subtitle:
      "Placeholder document. Customize for your product and compliance (GDPR, etc.).",
    note: "Not legal advice. Have it reviewed by legal counsel.",
    sections: {
      collect: {
        title: "Data we collect",
        body: "Email, contact details, and usage data (e.g. pages visited).",
      },
      use: {
        title: "How we use it",
        body: "To respond, improve the product, and ensure security.",
      },
      cookies: {
        title: "Cookies",
        body: "Technical cookies + optional analytics. Add a banner if needed.",
      },
      rights: {
        title: "Your rights",
        body: "Access, correction, deletion. Contact: privacy@leadforge.ai (placeholder).",
      },
    },
  },
  de: {
    title: "Datenschutz",
    subtitle: "Placeholder-Dokument. An Produkt und Compliance anpassen.",
    note: "Kein Rechtsrat. Bitte juristisch prüfen lassen.",
    sections: {
      collect: {
        title: "Welche Daten",
        body: "E-Mail, Kontaktinfos und Nutzungsdaten (z.B. besuchte Seiten).",
      },
      use: {
        title: "Nutzung",
        body: "Anfragen beantworten, Produkt verbessern, Sicherheit gewährleisten.",
      },
      cookies: {
        title: "Cookies",
        body: "Technische Cookies + optional Analytics. Banner ggf. hinzufügen.",
      },
      rights: {
        title: "Rechte",
        body: "Auskunft, Berichtigung, Löschung. Kontakt: privacy@leadforge.ai (placeholder).",
      },
    },
  },
  it: {
    title: "Privacy",
    subtitle: "Documento placeholder. Personalizza per prodotto e compliance.",
    note: "Non è consulenza legale. Fai revisionare da un legale.",
    sections: {
      collect: {
        title: "Dati raccolti",
        body: "Email, contatti e dati di utilizzo (es. pagine visitate).",
      },
      use: {
        title: "Utilizzo",
        body: "Rispondere, migliorare il prodotto e garantire la sicurezza.",
      },
      cookies: {
        title: "Cookie",
        body: "Cookie tecnici + analytics opzionali. Aggiungi banner se necessario.",
      },
      rights: {
        title: "Diritti",
        body: "Accesso, correzione, cancellazione. Contatto: privacy@leadforge.ai (placeholder).",
      },
    },
  },
};
