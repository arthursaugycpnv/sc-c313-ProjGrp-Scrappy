import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { isLocale, defaultLocale } from "@/i18n/routing";
import { FeaturesPage } from "@/features/marketing/features-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : defaultLocale;
  const titles: Record<Locale, string> = {
    fr: "Fonctionnalités",
    en: "Features",
    de: "Funktionen",
    it: "Funzionalità",
  };
  return { title: titles[l] };
}

export default function Page() {
  return <FeaturesPage />;
}
