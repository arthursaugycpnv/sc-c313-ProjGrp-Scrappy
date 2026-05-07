import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { isLocale, defaultLocale } from "@/i18n/routing";
import { ChangelogPage } from "@/features/marketing/changelog-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : defaultLocale;
  const titles: Record<Locale, string> = {
    fr: "Changelog",
    en: "Changelog",
    de: "Changelog",
    it: "Changelog",
  };
  return { title: titles[l] };
}

export default function Page() {
  return <ChangelogPage />;
}
