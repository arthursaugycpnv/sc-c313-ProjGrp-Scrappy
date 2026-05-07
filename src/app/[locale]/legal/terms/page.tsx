import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { isLocale, defaultLocale } from "@/i18n/routing";
import { TermsPage } from "@/features/legal/terms-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : defaultLocale;
  const titles: Record<Locale, string> = {
    fr: "Conditions d’utilisation",
    en: "Terms of Use",
    de: "Nutzungsbedingungen",
    it: "Termini d’uso",
  };
  return { title: titles[l] };
}

export default function Page() {
  return <TermsPage />;
}
