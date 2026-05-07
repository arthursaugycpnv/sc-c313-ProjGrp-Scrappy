# Manuel Git — Lead Scraper

## Branches principales

- **main** : code stable, livrable. On ne push jamais directement dessus.
- **develop** : branche d'intégration. C'est ici qu'on merge les features terminées.

## Workflow quotidien

### 1. Créer une branche feature

Toujours partir de `develop` à jour :

```bash
git checkout develop
git pull origin develop
git checkout -b feat/nom-de-la-feature
```

### 2. Nommer sa branche

Le format est `type/description-courte`. Types autorisés :

- `feat/` — nouvelle fonctionnalité (ex: `feat/search-bar`, `feat/export-csv`)
- `fix/` — correction de bug (ex: `fix/cors-error`, `fix/pagination`)
- `style/` — CSS, mise en page, aucun changement de logique
- `refactor/` — restructuration de code sans changer le comportement
- `docs/` — documentation uniquement

### 3. Commits

Faire des commits réguliers avec des messages clairs. Format recommandé :

```
type: description courte en français

Exemples :
feat: ajout de la barre de recherche
fix: correction du crash au lancement sans .env
style: alignement des cards sur mobile
docs: ajout des instructions d'installation au README
```

Pas de commits géants avec 15 fichiers. Si vous avez touché à plusieurs choses, faites plusieurs commits.

### 4. Pousser sa branche

```bash
git push origin feat/nom-de-la-feature
```

### 5. Intégrer dans develop

**Option A — Merge local** (pour les petites features sans risque) :

```bash
git checkout develop
git pull origin develop
git merge feat/nom-de-la-feature
git push origin develop
```

**Option B — Pull Request sur GitHub** (recommandé pour les features importantes) :

- Aller sur GitHub, cliquer sur "Compare & pull request"
- Base : `develop`, Compare : votre branche
- Ajouter au moins 1 reviewer
- Attendre l'approbation avant de merge

### 6. Livraison dans main

Quand `develop` est stable (fin de sprint), on fait une PR de `develop` vers `main` avec review obligatoire.

## Résoudre un conflit

```bash
# Depuis votre branche feature
git checkout feat/ma-feature
git pull origin develop    # récupérer les derniers changements

# Si conflit : ouvrir les fichiers marqués, résoudre, puis :
git add .
git commit -m "fix: résolution conflit avec develop"
```

En cas de doute sur un conflit, **demandez à l'auteur du code en question** avant de modifier.

## Synchroniser son travail

Avant de commencer à bosser chaque jour :

```bash
git checkout develop
git pull origin develop
git checkout feat/ma-feature
git merge develop
```

## Récupérer une branche distante (force pull)

Si votre branche locale est désynchronisée du remote :

```bash
git fetch origin
git reset --hard origin/nom-de-la-branche
```

**Attention** : ça écrase tout le travail local non pushé. Faites `git stash` avant si vous avez des modifications à garder.

## Règles de l'équipe

### Interdit

- Push directement dans `main` ou `develop`
- Modifier la branche de quelqu'un d'autre sans le prévenir
- `git push --force` sur `main` ou `develop` (sauf accord de toute l'équipe)
- Commiter des fichiers qui ne devraient pas être versionnés (`node_modules/`, `.env`, `*.db`)

### Obligatoire

- Toujours pull `develop` avant de créer une branche
- Messages de commit compréhensibles (pas de "fix", "update", "wip" tout seul)
- Reviewer le code des autres quand on est assigné
- Prévenir sur le groupe si on force push quoi que ce soit
