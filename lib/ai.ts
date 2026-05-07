import Anthropic from "@anthropic-ai/sdk";
import type { Prospect } from "./places";

/**
 * Couche IA : Claude Haiku scoring + génération de message d'approche.
 * Coût indicatif (mai 2026) : ~0.0003 € par lead enrichi.
 */

const MODEL = "claude-haiku-4-5-20251001";

export type EnrichedProspect = Prospect & {
  score: number; // 0-100
  reasoning: string; // courte justification du score
  outreach: string; // message d'approche prêt à copier
};

const client = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY manquant. Crée un fichier .env.local — voir README."
    );
  }
  return new Anthropic({ apiKey });
};

const SYSTEM_PROMPT = `Tu es un assistant pour un freelance/agence web qui cherche à vendre la création de sites internet à des entreprises locales.

Pour chaque prospect, tu dois :
1. Donner un SCORE entre 0 et 100 (potentiel commercial). Critères :
   - Note Google élevée (4+) et beaucoup d'avis (50+) = entreprise active, payeuse → score haut
   - Catégorie où un site est utile (restaurant, artisan, salon, médecin) → +
   - Pas de site web (déjà filtré) → c'est un vrai prospect
   - Peu d'avis ou note basse → score plus bas (moins de budget probable)
2. Justifier en UNE phrase courte (max 20 mots).
3. Rédiger un MESSAGE d'approche en français, ton chaleureux mais pro, 4-6 phrases :
   - Mentionne le nom de l'établissement et un détail spécifique (note, nombre d'avis, catégorie)
   - Souligne l'opportunité d'avoir un site (visibilité Google, réservations, crédibilité)
   - Propose un appel rapide ou une démo
   - Pas de "Cher" ou de formule pompeuse, plutôt direct comme un email moderne

Tu réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, au format :
{"score": <number>, "reasoning": "<string>", "outreach": "<string>"}
`;

export async function enrichProspect(p: Prospect): Promise<EnrichedProspect> {
  const userMsg = JSON.stringify({
    nom: p.name,
    categorie: p.category,
    adresse: p.address,
    note: p.rating,
    nombreAvis: p.reviewCount,
    telephone: p.phone,
  });

  const anthropic = client();
  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMsg }],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  let parsed: { score: number; reasoning: string; outreach: string };
  try {
    parsed = JSON.parse(extractJson(text));
  } catch {
    // Fallback robuste si le modèle a renvoyé du texte non JSON
    parsed = {
      score: 50,
      reasoning: "Analyse automatique impossible, score par défaut.",
      outreach: text.slice(0, 600),
    };
  }

  return {
    ...p,
    score: clamp(Math.round(parsed.score ?? 50), 0, 100),
    reasoning: parsed.reasoning ?? "",
    outreach: parsed.outreach ?? "",
  };
}

export async function enrichBatch(
  prospects: Prospect[]
): Promise<EnrichedProspect[]> {
  // Limite de concurrence : on enrichit 4 leads en parallèle pour rester
  // sous les rate limits de l'API tout en restant rapide.
  const out: EnrichedProspect[] = [];
  const concurrency = 4;
  for (let i = 0; i < prospects.length; i += concurrency) {
    const slice = prospects.slice(i, i + concurrency);
    const results = await Promise.all(
      slice.map((p) =>
        enrichProspect(p).catch((err) => {
          console.error("[enrich]", p.name, err.message);
          return {
            ...p,
            score: 0,
            reasoning: `Erreur d'enrichissement: ${err.message}`,
            outreach: "",
          } as EnrichedProspect;
        })
      )
    );
    out.push(...results);
  }
  // Tri par score décroissant : les meilleurs leads en haut
  return out.sort((a, b) => b.score - a.score);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function extractJson(text: string): string {
  // Tolère un éventuel ```json ... ``` autour
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first !== -1 && last !== -1) return text.slice(first, last + 1);
  return text;
}
