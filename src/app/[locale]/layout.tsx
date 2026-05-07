import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import "../globals.css";
import { defaultLocale, isLocale, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export function generateStaticParams() {
  return [
    { locale: "fr" },
    { locale: "en" },
    { locale: "de" },
    { locale: "it" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  const title = siteConfig.name;
  const description = siteConfig.description[safeLocale];

  return {
    title: {
      default: title,
      template: `%s · ${title}`,
    },
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      languages: {
        fr: "/fr",
        en: "/en",
        de: "/de",
        it: "/it",
      },
    },
    icons: { icon: "/favicon.ico" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Navbar locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
