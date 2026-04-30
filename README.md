# Scrappy

Application de scraping de leads pour freelances et solopreneurs specialises dans la creation de sites web.

## Concept

Scrappy scrappe Google Maps pour identifier automatiquement des entreprises sans presence web suffisante, les score selon leur potentiel commercial, et les organise dans un tableau Kanban pour le suivi de prospection.

## Fonctionnalites

- **Recherche automatique** — scrape Google Maps par secteur + localisation (50-100 resultats)
- **Scoring** — score 0-100 % par lead, code couleur vert/orange/rouge
- **Contacts** — extraction tel/email/URL/adresse, export CSV
- **Kanban** — suivi des prospects (Nouveau -> Contacte -> Interesse -> Relance -> Conclu)

## Installation

```bash
# Copier les variables d'environnement
cp .env.example .env

# Installer les dependances
npm install

# Lancer le serveur
npm start

# Mode developpement (rechargement automatique)
npm run dev
```

## Stack

- Node.js + Express 5

## Equipe

Ruben ten Cate, Selle Sow, Farah Mohamed, Kodjo Attivon, Arthur Saugy