import Link from "next/link";
import type { Locale } from "@/i18n/routing";

type FooterCopy = {
  tagline: string;
  product: string;
  company: string;
  legal: string;
  links: {
    features: string;
    pricing: string;
    integrations: string;
    demo: string;
    contact: string;
    privacy: string;
    terms: string;
  };
};

const copy: Record<Locale, FooterCopy> = {
  fr: {
    tagline: "Prospection intelligente pour freelances, agences et étudiants.",
    product: "Produit",
    company: "Entreprise",
    legal: "Légal",
    links: {
      features: "Fonctionnalités",
      pricing: "Tarifs",
      integrations: "Intégrations",
      demo: "Démo",
      contact: "Contact",
      privacy: "Confidentialité",
      terms: "Conditions",
    },
  },
  en: {
    tagline: "Smart prospecting for freelancers, agencies, and students.",
    product: "Product",
    company: "Company",
    legal: "Legal",
    links: {
      features: "Features",
      pricing: "Pricing",
      integrations: "Integrations",
      demo: "Demo",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms",
    },
  },
  de: {
    tagline: "Intelligente Akquise für Freelancer, Agenturen und Studierende.",
    product: "Produkt",
    company: "Unternehmen",
    legal: "Rechtliches",
    links: {
      features: "Funktionen",
      pricing: "Preise",
      integrations: "Integrationen",
      demo: "Demo",
      contact: "Kontakt",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen",
    },
  },
  it: {
    tagline: "Prospezione intelligente per freelance, agenzie e studenti.",
    product: "Prodotto",
    company: "Azienda",
    legal: "Legale",
    links: {
      features: "Funzionalità",
      pricing: "Prezzi",
      integrations: "Integrazioni",
      demo: "Demo",
      contact: "Contatto",
      privacy: "Privacy",
      terms: "Termini",
    },
  },
};

export function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <footer className="border-t border-[rgb(var(--border))]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400" />
              <span className="text-sm font-semibold">LeadForge AI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-[rgb(var(--foreground))]/70">
              {c.tagline}
            </p>
          </div>

          <FooterCol title={c.product}>
            <FooterLink href={`/${locale}/features`} label={c.links.features} />
            <FooterLink href={`/${locale}/pricing`} label={c.links.pricing} />
            <FooterLink
              href={`/${locale}/integrations`}
              label={c.links.integrations}
            />
            <FooterLink href={`/${locale}/demo`} label={c.links.demo} />
          </FooterCol>

          <FooterCol title={c.company}>
            <FooterLink href={`/${locale}/contact`} label={c.links.contact} />
          </FooterCol>

          <FooterCol title={c.legal}>
            <FooterLink
              href={`/${locale}/legal/privacy`}
              label={c.links.privacy}
            />
            <FooterLink href={`/${locale}/legal/terms`} label={c.links.terms} />
          </FooterCol>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[rgb(var(--border))] pt-6 text-xs text-[rgb(var(--foreground))]/70 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} LeadForge AI</span>
          <span>Built with Next.js · Tailwind · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--foreground))]/80">
        {title}
      </div>
      <div className="mt-3 flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-[rgb(var(--foreground))]/70 hover:text-[rgb(var(--foreground))] transition-colors"
    >
      {label}
    </Link>
  );
}
