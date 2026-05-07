"use client";

import type { Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
  it: "IT",
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function setLocale(nextLocale: Locale) {
    if (!pathname) return;
    // pathname expected: /{locale}/...
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) {
      router.push(`/${nextLocale}`);
      return;
    }
    parts[0] = nextLocale;
    router.push("/" + parts.join("/"));
  }

  return (
    <div className="relative">
      <select
        className="h-10 rounded-full border border-border/60 bg-background px-3 text-xs"
        aria-label="Language"
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {labels[l]}
          </option>
        ))}
      </select>
    </div>
  );
}
