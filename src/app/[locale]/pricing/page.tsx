import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { isLocale, defaultLocale } from "@/i18n/routing";
import { PricingPage } from "@/features/marketing/pricing-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : defaultLocale;
  const titles: Record<Locale, string> = {
    fr: "Tarifs",
    en: "Pricing",
    de: "Preise",
    it: "Prezzi",
  };
  return { title: titles[l] };
}

export default function Page() {
  return <PricingPage />;
}
