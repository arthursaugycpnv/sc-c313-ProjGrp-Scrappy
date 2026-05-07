import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const routes = [
  "",
  "/features",
  "/pricing",
  "/integrations",
  "/demo",
  "/contact",
  "/changelog",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    routes.map((r) => ({
      url: `${baseUrl}/${locale}${r}`,
      lastModified: now,
      changeFrequency: r === "" ? "weekly" : "monthly",
      priority: r === "" ? 1 : 0.7,
    })),
  );
}
