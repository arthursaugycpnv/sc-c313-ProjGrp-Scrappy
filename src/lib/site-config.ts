import type { Locale } from "@/i18n/routing";

export const siteConfig: {
  name: string;
  url: string;
  description: Record<Locale, string>;
} = {
  name: "LeadForge AI",
  url: "http://localhost:3000",
  description: {
    fr: "Prospection intelligente: détectez des opportunités locales et transformez-les en clients.",
    en: "Smart prospecting: discover local opportunities and turn them into clients.",
    de: "Intelligente Akquise: lokale Chancen finden und in Kunden verwandeln.",
    it: "Prospezione intelligente: scopri opportunità locali e trasformale in clienti.",
  },
};
