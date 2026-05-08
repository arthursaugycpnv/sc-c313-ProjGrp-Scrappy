import type { Lead } from "./lead-types";

function makeId(seed: string) {
  return seed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

const sampleBusinesses = [
  {
    name: "Plomberie du Centre",
    category: "plombier",
    rating: 4.6,
    reviews: 128,
    hasWebsite: true,
    hasEmail: true,
    hasPhone: true,
  },
  {
    name: "WebCraft Studio",
    category: "agence web",
    rating: 4.2,
    reviews: 41,
    hasWebsite: true,
    hasEmail: false,
    hasPhone: true,
  },
  {
    name: "Menuiserie Leblanc",
    category: "menuisier",
    rating: 4.9,
    reviews: 12,
    hasWebsite: false,
    hasEmail: false,
    hasPhone: true,
  },
  {
    name: "Garage du Lac",
    category: "garage",
    rating: 3.8,
    reviews: 83,
    hasWebsite: true,
    hasEmail: true,
    hasPhone: true,
  },
] as const;

export type SearchParams = {
  activityType: string;
  region: string;
  targetCount: number; // 50..100
};

/**
 * Mocked Google Maps search.
 * Generates deterministic leads without calling external services.
 */
export async function mockSearchProspects(
  params: SearchParams,
): Promise<Lead[]> {
  const { activityType, region, targetCount } = params;
  const count = Math.max(1, Math.min(100, targetCount));

  const base = (activityType || "prospect").trim();
  const loc = (region || "Suisse").trim();

  const results: Lead[] = [];
  for (let i = 0; i < count; i++) {
    const template = sampleBusinesses[i % sampleBusinesses.length];
    const n = i + 1;
    const name = `${template.name} ${base} #${n}`;

    const websiteUrl = template.hasWebsite
      ? `https://example.com/${makeId(name)}`
      : undefined;

    const email = template.hasEmail ? `${makeId(name)}@example.com` : undefined;
    const phone = template.hasPhone
      ? `+41 79 ${String(100 + (n % 900)).padStart(3, "0")} ${String(10 + (n % 90)).padStart(2, "0")} ${String(10 + ((n * 7) % 90)).padStart(2, "0")}`
      : undefined;

    results.push({
      id: `${makeId(base)}:${makeId(loc)}:${makeId(name)}`,
      name,
      category: activityType || template.category,
      location: loc,
      googleRating: template.rating,
      reviewCount: template.reviews + (i % 30),
      contact: {
        phone,
        email,
        websiteUrl,
        address: `Rue Exemple ${n}, ${loc}`,
      },
      createdAt: new Date().toISOString(),
    });
  }

  // Simulate latency.
  await new Promise((r) => setTimeout(r, 500));

  return results;
}
