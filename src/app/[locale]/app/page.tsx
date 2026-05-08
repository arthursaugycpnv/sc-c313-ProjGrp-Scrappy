import type { Locale } from "@/i18n/routing";
import { AppPage } from "@/features/app/app-page";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <AppPage locale={locale} />;
}
