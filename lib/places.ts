/**
 * Google Places API (New) — Text Search
 * Docs : https://developers.google.com/maps/documentation/places/web-service/text-search
 *
 * On utilise un FieldMask pour ne payer/renvoyer que les champs utiles.
 * Le tarif Pro est nul jusqu'à 5 000 appels/mois (mai 2026), au-delà c'est ~32 $/1000.
 */

export type RawPlace = {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  primaryTypeDisplayName?: { text: string };
  googleMapsUri?: string;
  location?: { latitude: number; longitude: number };
  businessStatus?: string;
};

export type Prospect = {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string | null;
  rating: number | null;
  reviewCount: number;
  googleMapsUrl: string;
  hasWebsite: boolean;
};

const PLACES_ENDPOINT = "https://places.googleapis.com/v1/places:searchText";

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.websiteUri",
  "places.rating",
  "places.userRatingCount",
  "places.primaryTypeDisplayName",
  "places.googleMapsUri",
  "places.location",
  "places.businessStatus",
].join(",");

export type SearchInput = {
  query: string;
  city: string;
  radiusKm?: number;
  /** ne garder QUE les business sans site web (par défaut: true) */
  noWebsiteOnly?: boolean;
  /** max 20 résultats par appel côté Places API (New) */
  maxResults?: number;
};

export async function searchProspects(input: SearchInput): Promise<Prospect[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GOOGLE_PLACES_API_KEY manquant. Crée un fichier .env.local — voir README."
    );
  }

  const radiusMeters = Math.min((input.radiusKm ?? 10) * 1000, 50000);
  const textQuery = `${input.query} à ${input.city}`;
  const maxResults = Math.min(input.maxResults ?? 20, 20);

  const body = {
    textQuery,
    languageCode: "fr",
    regionCode: "FR",
    maxResultCount: maxResults,
    // locationBias avec circle : Google penche les résultats vers cette zone.
    // On ne peut pas géocoder ici sans un appel supplémentaire — la ville
    // est déjà incluse dans textQuery, donc Google fait un bon job.
    // Pour aller plus loin : appeler l'API Geocoding pour obtenir lat/lng
    // de la ville, puis utiliser locationRestriction (résultats stricts).
  };

  const res = await fetch(PLACES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Places API error (${res.status}): ${errText}`);
  }

  const data = (await res.json()) as { places?: RawPlace[] };
  const places = data.places ?? [];

  const all: Prospect[] = places.map(toProspect);

  if (input.noWebsiteOnly !== false) {
    return all.filter((p) => !p.hasWebsite);
  }
  return all;
}

function toProspect(p: RawPlace): Prospect {
  return {
    id: p.id,
    name: p.displayName?.text ?? "(Sans nom)",
    category: p.primaryTypeDisplayName?.text ?? "Établissement",
    address: p.formattedAddress ?? "",
    phone: p.nationalPhoneNumber ?? p.internationalPhoneNumber ?? null,
    rating: typeof p.rating === "number" ? p.rating : null,
    reviewCount: p.userRatingCount ?? 0,
    googleMapsUrl: p.googleMapsUri ?? `https://www.google.com/maps/place/?q=place_id:${p.id}`,
    hasWebsite: Boolean(p.websiteUri && p.websiteUri.length > 0),
  };
}
