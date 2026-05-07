import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { isLocale, defaultLocale } from "@/i18n/routing";
import { PrivacyPage } from "@/features/legal/privacy-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : defaultLocale;
  const titles: Record<Locale, string> = {
    fr: "Politique de confidentialité",
    en: "Privacy Policy",
    de: "Datenschutz",
    it: "Privacy",
  };
  return { title: titles[l] };
}

export default function Page() {
  return <PrivacyPage />;
}
