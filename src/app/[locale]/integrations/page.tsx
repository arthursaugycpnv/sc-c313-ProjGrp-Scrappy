import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { isLocale, defaultLocale } from "@/i18n/routing";
import { IntegrationsPage } from "@/features/marketing/integrations-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : defaultLocale;
  const titles: Record<Locale, string> = {
    fr: "Intégrations",
    en: "Integrations",
    de: "Integrationen",
    it: "Integrazioni",
  };
  return { title: titles[l] };
}

export default function Page() {
  return <IntegrationsPage />;
}
