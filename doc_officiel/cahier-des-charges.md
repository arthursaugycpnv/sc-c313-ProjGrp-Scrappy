# Cahier des charges — Scrappy (v1.1)

**Application de Scrapping de Leads**
*Prospection intelligente pour freelances & solopreneurs createurs de site web*

**Equipe :** Ruben ten Cate, Selle Sow, Farah Mohamed, Kodjo Attivon, Arthur Saugy
**Date :** 24 avril 2026
**Slogan :** *Scrap. Score. Close.*

---

## 01 — Contexte & Introduction

Tout freelance ou solopreneur specialise dans la creation de sites web a connu une periode creuse : parfois en debut d'activite, parfois en pleine croissance. Ces phases ou les clients se font rares sont eprouvantes : sans revenu stable, l'idee de devoir revenir a un emploi alimentaire devient une menace bien reelle.

La difficulte n'est pas toujours de savoir creer — c'est de trouver a qui vendre. Identifier des prospects serieux, verifies, reellement susceptibles d'investir dans un site web : voila ce qui manque. Non pas une liste froide de contacts, mais des opportunites qualifiees, la ou le besoin existe et ou la volonte de payer est probable.

C'est pour repondre a ce probleme que l'equipe a concu un outil de scraping specialise. Son objectif : identifier automatiquement des entreprises ou professionnels sans presence web suffisante, susceptibles de devenir des clients pour un createur de site independant.

### Vision du produit

Transformer une source de donnees publique (Google Maps) en un veritable outil d'aide a la decision commerciale — plus rapide, plus cible et surtout plus strategique que la prospection manuelle.

---

## 02 — Objectifs du projet

L'application doit permettre a un freelance ou solopreneur de :

- Automatiser la recherche d'entreprises selon des criteres definis (secteur, localisation)
- Extraire les informations de contact essentielles (telephone, email, site web, adresse)
- Filtrer les resultats selon des parametres personnalisables (notes, avis, presence en ligne)
- Scorer chaque lead pour evaluer son potentiel commercial en un coup d'oeil
- Gerer et suivre ses prospects via un tableau Kanban integre
- Gagner plusieurs heures de prospection manuelle par semaine

### Indicateur de succes cible

> Passer de **8 h/semaine** de recherche manuelle a **moins de 30 minutes** grace a l'automatisation et au scoring.

---

## 03 — Besoins fonctionnels

L'application est structuree autour de quatre modules principaux, independants mais complementaires.

### F1 — Recherche automatique de prospects

- **Source principale :** Google Maps
- **Criteres de recherche :** type d'activite (ex. « plombier », « agence web »), zone geographique
- **Volume cible :** 50 a 100 resultats par recherche
- **Filtres :** nombre d'avis, note moyenne, presence d'un site web, numero de telephone, email

### F2 — Scoring des opportunites

- Calcul automatique d'un score de 0 a 100 % pour chaque lead
- Algorithme base sur des signaux explicites (note, avis, qualite du site) et implicites (presence digitale)
- Score eleve = lead bien qualifie, avec un potentiel commercial avere
- **Affichage visuel :** code couleur vert / orange / rouge

### F3 — Donnees de contact completes

- Extraction : numero de telephone, adresse email, URL du site web, adresse postale
- Enrichissement automatique depuis le site web du prospect si disponible
- Export des donnees en **CSV / Google Sheets** en un clic

### F4 — Kanban — Lead Tracker

- Vue tableau Kanban pour le suivi de chaque prospect
- **Colonnes par defaut :** Nouveau → Contacte → Interesse → Relance → Conclu
- Historique des interactions par prospect (appels, emails, notes)
- Possibilite d'ajouter des tags et des commentaires libres

---

## 04 — Planification & Delais

Le projet est decoupe en **3 sprints de 3 semaines**, pour une livraison finale le **29 juin 2026**.

| | Sprint 1 | Sprint 2 | Sprint 3 |
|---|---|---|---|
| **Periode** | Mi-mai → Fin mai | Debut juin → Mi-juin | Mi-juin → 29 juin |
| **Livrables** | Setup projet & architecture | Algorithme de scoring | Module Kanban |
| | Scrapper Google Maps (MVP) | Enrichissement des contacts | Historique & notes |
| | Extraction donnees de base | Filtres avances | Tests & corrections |
| | Interface de recherche | Export CSV | Livraison finale |

### Contraintes

- Chaque sprint se termine par une **demo fonctionnelle** du module livre
- Les fonctionnalites critiques **(F1 + F2) doivent etre operationnelles des le Sprint 2**
- La date du **29 juin est fixe et non negociable**

---

## 05 — Analyse du marche

Ce projet s'inscrit dans un marche en forte croissance, mais structurellement mal adresse pour les independants.

| Indicateur | Valeur |
|---|---|
| Marche mondial lead gen | 4,7 Mds $ |
| Croissance annuelle | +12,3 % |
| Freelances en Europe | 47 M |

### Contexte concurrentiel

Les solutions existantes sont pensees pour des equipes commerciales avec des budgets dedies :

| Outil | Prix |
|---|---|
| Apollo | 49 $/mois |
| ZoomInfo | 15 000 $/an |
| Octoparse | 1,50 $/1 000 lignes + abonnement |

Aucun outil simple, abordable et en francais n'existe pour le solopreneur qui veut prospecter en autonomie.

### Problemes non resolus

- 8 h/semaine perdues en recherche manuelle
- Outils trop chers pour les independants
- Aucun outil dedie a la vente de sites web
- Aucun outil francophone pour solopreneurs

### Notre positionnement

| Axe | Valeur |
|---|---|
| Simple | Resultats en < 5 minutes |
| Accessible | < 30 €/mois |
| Local | Sources FR, RGPD natif |
| Intelligent | Scoring automatique |

---

*Arthur Saugy — Avril 2026*
