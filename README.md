# Prospect Finder — clone de Tenji.ai

Trouve automatiquement des prospects sur Google Maps **qui n'ont pas de site web**, les score avec une IA, et génère un message d'approche personnalisé. Ciblé pour les freelances/agences web.

---

## 📊 Quelle API utiliser ? (résumé de la recherche)

J'ai comparé 4 approches pour le scraping Google Maps. Voici ce qui ressort pour ton cas (< 1000 prospects/mois, budget < 20 €/mois) :

| Solution | Prix / 1000 résultats | Free tier | Fiabilité | Verdict |
|---|---|---|---|---|
| **Google Places API (New)** | ~32 $ après quota | **5 000 appels/mois GRATUITS** (Pro tier) | ⭐⭐⭐⭐⭐ Officielle | ✅ **Choisi** — gratuit pour ton volume, données fiables, champ `websiteUri` natif |
| Outscraper | 3 $ / 1000 | 500 résultats | ⭐⭐⭐⭐ | Bonne alternative payante |
| Apify (Google Maps Scraper actor) | 4 $ / 1000 (+ 2 $ pour emails) | ~5 $ crédits | ⭐⭐⭐⭐ | Plus cher, mais très configurable |
| SerpApi | ~5 $ / 1000 (Maps) | 100 / mois | ⭐⭐⭐⭐ | Cher pour ce qu'il offre — **comme tu l'as dit** |
| Scraper maison (Playwright) | "gratuit" + proxies | — | ⭐⭐ Très fragile | ❌ Google bloque vite, 0 ROI à ce volume |

**Recommandation :** commence avec **Google Places API officielle**. Le quota gratuit Pro de **5 000 Text Search/mois** couvre largement tes 1 000 prospects (1 recherche = 1 appel qui retourne jusqu'à 20 résultats, donc ~50 recherches couvrent ton mois). Si tu satures, bascule sur **Outscraper** (3 $ / 1000).

**Construire ton propre scraper ?** Pas à ce volume. Le coût d'entretien (proxies rotatifs, captchas, changements DOM Google) est largement supérieur à 20 €/mois.

### Sur l'IA : utile ou pas ?

**Oui, mais pas pour la recherche elle-même.** Les filtres natifs Google (catégorie, ville, rayon, présence de site) sont déjà très bons. L'IA apporte de la valeur **après** :

1. **Scoring du lead** (1-100) — qualité du business (bonnes notes, beaucoup d'avis = signal de revenu, donc payeur potentiel)
2. **Génération du message d'approche personnalisé** — un message qui mentionne le nom, la spécialité, et un angle pertinent ("J'ai vu que vous avez 4.7★ avec 230 avis mais pas de site...") convertit beaucoup mieux qu'un cold email générique.

J'utilise **Claude Haiku** (~0.25 $/M tokens en input, 1.25 $/M en output) — pour 1 000 leads enrichis, ça revient à ~0.30 € au total. Ridicule.

---

## 🚀 Setup (5 minutes)

### 1. Cloner et installer

```bash
cd prospect-finder
npm install
```

### 2. Récupérer les clés API

**Google Places API (New)** — gratuit à ton volume :
1. Va sur [Google Cloud Console](https://console.cloud.google.com/)
2. Crée un projet, active **"Places API (New)"**
3. APIs & Services → Credentials → Create credentials → API key
4. Restreins la clé : "Restrict key" → Places API (New) only

**Anthropic API key** (pour le scoring IA) :
1. [console.anthropic.com](https://console.anthropic.com/) → API Keys → Create

### 3. Configurer

```bash
cp .env.local.example .env.local
```

Édite `.env.local` :

```
GOOGLE_PLACES_API_KEY=AIza...
ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Lancer

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

---

## 🎯 Comment ça marche

1. **Tu tapes** : `"plombier"` à `"Lyon"` dans un rayon de `10 km`
2. Le backend appelle **Google Places API Text Search** avec le field mask qui inclut `websiteUri`
3. **Filtre** : on garde uniquement les places où `websiteUri` est vide → **prospects qualifiés**
4. **Pour chaque prospect**, Claude Haiku :
   - Score le lead sur 100 (basé sur rating, nombre d'avis, catégorie)
   - Rédige un message d'approche en français, prêt à copier
5. **Tu exportes** en CSV ou tu copies un message à la fois.

---

## 📁 Structure

```
app/
├── page.tsx              # UI : formulaire + tableau
├── api/search/route.ts   # appel Google Places + filtre "no website"
├── api/enrich/route.ts   # appel Claude Haiku pour scoring + message
└── layout.tsx, globals.css
lib/
├── places.ts             # client Google Places
└── ai.ts                 # client Anthropic
```

---

## 💡 Améliorations possibles

- **Pagination** : Places API New retourne max 20 résultats par appel (paginable jusqu'à 60). Ajouter un bouton "charger plus".
- **Email scraping** : Places API ne donne pas l'email. Ajouter une étape qui visite le site (ou les Pages Jaunes / Societe.com) pour extraire l'email. Apify fait ça nativement.
- **Sauvegarde** : ajouter Postgres + Prisma pour conserver les leads contactés et éviter les doublons.
- **CRM** : push direct vers HubSpot / Pipedrive / Notion via webhook.
- **Multi-source** : agréger Google Maps + Pages Jaunes + Yelp pour plus de couverture.

---

## ⚖️ Légalité

Récupérer des infos publiques (nom, téléphone, adresse) d'entreprises est légal en UE. Mais :
- **RGPD** : si tu stockes ces données et fais du démarchage, tu dois respecter le cadre B2B (intérêt légitime + opt-out facile).
- **Pas de mass cold email** sans Bimi/SPF/DKIM correct, sinon ton domaine va griller.
- **Google ToS** : utiliser l'API officielle est OK. Scraper Maps directement est une violation ToS — voilà pourquoi on prend l'API.
