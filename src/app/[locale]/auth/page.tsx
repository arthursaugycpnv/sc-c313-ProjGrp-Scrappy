import type { Locale } from "@/i18n/routing";
import { AuthPage } from "@/features/auth/auth-page";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ next?: string }>;
}) {
  const { locale } = await params;
  const { next } = await searchParams;
  return <AuthPage locale={locale} nextPath={next} />;
}
