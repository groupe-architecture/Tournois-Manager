# Tournoi Manager

Application de création et de gestion de tournois sportifs et e-sport, développée dans le cadre du cours d'**architecture logicielle** à l'ECE Paris.

Le projet se construit en trois phases : un site web interactif en PHP, puis l'extraction d'une API REST, puis une application cliente (mobile ou web) qui consomme cette API. L'objectif est de montrer qu'une architecture bien découpée permet de faire évoluer l'application sans la réécrire.

---

## Sommaire

1. [Présentation](#présentation)
2. [Cas d'utilisation](#cas-dutilisation)
3. [Disciplines et règles](#disciplines-et-règles)
4. [Architecture](#architecture)
5. [Modèle de données](#modèle-de-données)
6. [Règles métier](#règles-métier)
7. [Phases du projet](#phases-du-projet)
8. [Structure du projet](#structure-du-projet)
9. [Stack technique](#stack-technique)
10. [Installation](#installation)
11. [Équipe](#équipe)

---

## Présentation

Tournoi Manager permet à n'importe quel utilisateur de créer un tournoi, public ou privé, sur un sport ou un jeu vidéo compétitif. Les autres utilisateurs peuvent rejoindre le tournoi et suivre les résultats des matchs, le classement et les statistiques.

Les scores sont gérés par l'application : après chaque match, le capitaine de chaque équipe déclare le résultat. Si les deux déclarations concordent, l'application valide le match automatiquement et met à jour le classement et les statistiques. Si elles diffèrent, le match passe en litige et le créateur du tournoi tranche.

Disciplines disponibles :

- **Sports** : Football, Basketball
- **Jeux vidéo** : EA Sports FC (ex-FIFA), Valorant

---

## Cas d'utilisation

### Acteurs

| Acteur | Rôle |
|---|---|
| **Visiteur** | Utilisateur non connecté. Peut créer un compte ou se connecter. |
| **Joueur** | Utilisateur connecté. Peut rejoindre des tournois et consulter les résultats. |
| **Capitaine** | Joueur responsable de son équipe. Déclare le score et les statistiques de son équipe après chaque match. |
| **Créateur** | Joueur qui a créé un tournoi. Il le configure et arbitre les litiges. |

Un même utilisateur peut être créateur d'un tournoi et simple joueur dans un autre. Dans un tournoi en 1v1, chaque joueur est automatiquement capitaine de son équipe de 1.

### Côté créateur

1. Se connecter à l'application.
2. Créer un tournoi et choisir sa visibilité : **public** ou **privé**.
3. Choisir le type : **sport** ou **jeu vidéo**.
4. Choisir la discipline :
   - Sport : Football ou Basketball
   - Jeu vidéo : EA Sports FC ou Valorant
5. Choisir le mode de jeu (taille des équipes), selon la discipline.
6. Définir le nombre maximum de participants.
7. Si le tournoi est privé, l'application génère un **code d'accès** que le créateur partage aux joueurs.
8. Arbitrer les matchs en litige (quand les deux capitaines ont déclaré des scores différents) en fixant le score définitif.

Le créateur ne saisit pas les scores lui-même : ce sont les capitaines qui les déclarent et l'application qui les valide.

### Côté joueur

1. Se connecter à l'application.
2. Choisir entre :
   - rejoindre un **tournoi public** (accès libre, sans code)
   - rejoindre un **tournoi privé** (saisie du code fourni par le créateur)
   - **créer son propre tournoi** (il devient alors créateur)
3. Une fois inscrit, le joueur peut consulter :
   - les scores des matchs joués
   - le classement, recalculé automatiquement après chaque résultat
   - les statistiques globales (par équipe) et individuelles (par joueur)

Un joueur ne peut **jamais** modifier la configuration d'un tournoi ni un score déjà validé.

### Côté capitaine

1. Après un match, déclarer le score final.
2. Déclarer les statistiques individuelles des joueurs de **sa propre équipe**.
3. Suivre l'état du match :
   - **en attente** : l'équipe adverse n'a pas encore déclaré
   - **validé** : les deux déclarations concordent, le résultat est définitif
   - **en litige** : les déclarations diffèrent, le créateur va trancher

Tant que le match n'est pas validé, le capitaine peut corriger sa déclaration. Une fois validé, plus personne ne peut la modifier.

---

## Disciplines et règles

Chaque discipline a ses propres règles de score, de classement et ses propres statistiques.

| | Football | Basketball | Valorant | EA Sports FC |
|---|---|---|---|---|
| **Modes** | 5v5, 11v11 | 3x3, 5x5 | 5v5 | 1v1, Clubs (jusqu'à 11) |
| **Score** | Buts | Points | Rounds (13 pour gagner) | Buts |
| **Match nul** | Possible | Impossible | Impossible | Possible |
| **Points au classement** | 3 victoire / 1 nul / 0 défaite | 2 victoire / 1 défaite | 1 victoire / 0 défaite | 3 victoire / 1 nul / 0 défaite |
| **Départage** | Différence de buts, puis buts marqués | Différence de points | Différence de rounds | Différence de buts |
| **Stats individuelles** | Buts, passes décisives, cartons | Points, rebonds, passes | Kills, deaths, assists | Buts, clean sheets |

Pour Valorant, un match correspond à une seule map (format BO1).

Le football et EA Sports FC partagent la même logique de score. La seule différence est le mode de jeu et donc la taille des équipes.

---

## Architecture

### Principe général

L'application est découpée en couches, chacune avec une responsabilité unique :

```
Présentation (vues PHP, puis client mobile/web)
        │
Contrôleurs (reçoivent les requêtes, renvoient une vue ou du JSON)
        │
Services (toute la logique métier : classement, validation, calendrier)
        │
Repositories (accès à la base de données)
        │
Base de données MySQL
```

**Règle d'or** : aucune logique métier dans les contrôleurs ni dans les vues. Tout passe par la couche service. C'est ce qui permet, en phase 2, de remplacer les vues HTML par une API JSON en ne modifiant que les contrôleurs.

### Pattern Strategy : gérer plusieurs disciplines

Les règles changent selon la discipline. Plutôt que de multiplier les `if ($discipline == 'foot')` partout dans le code, chaque discipline est représentée par une classe qui implémente une interface commune.

```php
interface RegleDiscipline
{
    public function modesDisponibles(): array;
    public function validerEquipe(Equipe $equipe, string $mode): bool;
    public function validerResultat(Match $match): bool;
    public function calculerPoints(Match $match, Equipe $equipe): int;
    public function departager(array $equipes): array;
    public function statsDisponibles(): array;
}
```

Implémentations :

- `RegleFoot`
- `RegleBasket`
- `RegleValorant`
- `RegleFifa`

`RegleFoot` et `RegleFifa` réutilisent une classe commune `ScoreParButs` (composition) pour la logique de score, de nul et de départage.

### Pattern Factory

Une `RegleFactory` renvoie la bonne implémentation selon la discipline du tournoi :

```php
$regle = RegleFactory::pour($tournoi->getDiscipline());
$points = $regle->calculerPoints($match, $equipe);
```

Le reste de l'application ne connaît que l'interface `RegleDiscipline`. Ajouter une nouvelle discipline revient à créer une nouvelle classe, sans toucher au code existant (principe ouvert/fermé).

### Tout le monde joue en équipe

Pour simplifier le modèle, **un match oppose toujours deux équipes**. Dans un tournoi en 1v1 (EA Sports FC classique), chaque joueur est automatiquement placé dans une équipe de 1 qui porte son pseudo.

Exemple : un tournoi 1v1 avec 10 joueurs contient 10 équipes de 1 joueur.

Côté utilisateur, la notion d'équipe est invisible en 1v1 : le classement affiche directement le pseudo du joueur. Côté code, la logique de calendrier, de classement et d'affichage est strictement la même quelle que soit la discipline ou la taille des équipes.

### Cycle de vie d'un match (machine à états)

La gestion des scores repose sur les états d'un match. Chaque transition est contrôlée par un `ServiceMatch` : aucun changement d'état n'est possible en dehors de ces règles.

```
A_JOUER ──(1re déclaration)──▶ EN_ATTENTE ──(2e déclaration identique)──▶ VALIDE
                                   │
                                   └──(2e déclaration différente)──▶ LITIGE ──(décision du créateur)──▶ VALIDE
```

| État | Signification | Qui peut agir |
|---|---|---|
| `a_jouer` | Aucune déclaration | Les deux capitaines |
| `en_attente` | Un seul capitaine a déclaré | Le capitaine qui n'a pas déclaré (l'autre peut corriger la sienne) |
| `litige` | Les deux déclarations diffèrent | Le créateur, qui fixe le score définitif. Les capitaines peuvent aussi corriger leur déclaration : si elles redeviennent identiques, le match est validé |
| `valide` | Résultat définitif | Personne. Le match compte pour le classement et les stats |

Seuls les matchs à l'état `valide` sont pris en compte dans le classement et les statistiques.

---

## Modèle de données

### Tables

**users**
| Colonne | Type | Description |
|---|---|---|
| id | INT PK | |
| pseudo | VARCHAR | Unique |
| email | VARCHAR | Unique |
| mot_de_passe | VARCHAR | Hashé (`password_hash`) |
| date_creation | DATETIME | |

**tournois**
| Colonne | Type | Description |
|---|---|---|
| id | INT PK | |
| createur_id | INT FK → users | |
| nom | VARCHAR | |
| type | ENUM('sport', 'jeu_video') | |
| discipline | ENUM('foot', 'basket', 'valorant', 'fifa') | |
| mode | VARCHAR | Ex : `5v5`, `1v1`, `clubs` |
| taille_equipe | INT | Nombre de joueurs par équipe |
| visibilite | ENUM('public', 'prive') | |
| code_acces | VARCHAR(8) NULL | Uniquement si privé |
| max_participants | INT | |
| statut | ENUM('inscriptions', 'en_cours', 'termine') | |
| date_creation | DATETIME | |

**equipes**
| Colonne | Type | Description |
|---|---|---|
| id | INT PK | |
| tournoi_id | INT FK → tournois | |
| nom | VARCHAR | Pseudo du joueur en 1v1 |

**equipe_membres**
| Colonne | Type | Description |
|---|---|---|
| equipe_id | INT FK → equipes | |
| user_id | INT FK → users | |
| capitaine | BOOLEAN | |

**matchs**
| Colonne | Type | Description |
|---|---|---|
| id | INT PK | |
| tournoi_id | INT FK → tournois | |
| equipe_a_id | INT FK → equipes | |
| equipe_b_id | INT FK → equipes | |
| score_a | INT NULL | Score définitif, rempli uniquement quand le match est validé |
| score_b | INT NULL | Score définitif, rempli uniquement quand le match est validé |
| statut | ENUM('a_jouer', 'en_attente', 'litige', 'valide') | |
| valide_par | ENUM('concordance', 'createur') NULL | Comment le score a été validé |
| date_match | DATETIME NULL | |

**declarations_score**
| Colonne | Type | Description |
|---|---|---|
| id | INT PK | |
| match_id | INT FK → matchs | |
| equipe_id | INT FK → equipes | Équipe qui déclare |
| capitaine_id | INT FK → users | Auteur de la déclaration |
| score_a | INT | Score déclaré pour l'équipe A |
| score_b | INT | Score déclaré pour l'équipe B |
| date_declaration | DATETIME | |

Contrainte d'unicité sur (`match_id`, `equipe_id`) : une seule déclaration par équipe et par match. Une correction met à jour la déclaration existante.

**stats_joueur_match**
| Colonne | Type | Description |
|---|---|---|
| id | INT PK | |
| match_id | INT FK → matchs | |
| user_id | INT FK → users | Joueur concerné |
| declare_par | INT FK → users | Capitaine de l'équipe du joueur |
| stats | JSON | Contenu variable selon la discipline |

Chaque capitaine déclare uniquement les statistiques des joueurs de sa propre équipe. Elles ne sont prises en compte que lorsque le match est validé.

Exemples de contenu du champ `stats` :

```json
// Football
{ "buts": 2, "passes_decisives": 1, "cartons_jaunes": 0, "cartons_rouges": 0 }

// Valorant
{ "kills": 21, "deaths": 14, "assists": 6 }
```

Le champ JSON permet de stocker des statistiques différentes selon la discipline sans créer une table par jeu. La validation du contenu est faite par la couche service, à partir de `statsDisponibles()` de la règle de la discipline.

### Ce qui n'est pas stocké

Le **classement** n'est pas stocké en base. Il est recalculé à partir des matchs validés à chaque consultation. Il ne peut donc jamais être désynchronisé des scores réels.

Même principe pour les **statistiques globales** : ce sont des agrégats (sommes, moyennes) calculés à partir de `stats_joueur_match`.

---

## Règles métier

### Accès et droits

- Seul le créateur peut modifier la configuration d'un tournoi.
- Seuls les capitaines des deux équipes d'un match peuvent déclarer son score.
- Seul le créateur peut fixer le score d'un match en litige.
- Un score validé ne peut plus être modifié par personne.
- Les autres joueurs inscrits ont un accès en lecture seule.
- Un tournoi public est accessible sans code.
- Un tournoi privé nécessite le code d'accès.

### Code d'accès privé

- Généré aléatoirement à la création, 8 caractères alphanumériques.
- Unique parmi les tournois existants.
- Nombre de tentatives de saisie limité pour éviter qu'on devine un code par force brute.

### Inscriptions

- Impossible de rejoindre un tournoi complet (`max_participants` atteint).
- Impossible de rejoindre un tournoi dont le statut n'est plus `inscriptions`.
- Une équipe doit respecter la taille imposée par le mode (`validerEquipe()`).
- En 1v1, l'équipe de 1 est créée automatiquement à l'inscription.
- Un joueur ne peut être que dans une seule équipe par tournoi.

### Résultats

- Chaque déclaration est d'abord vérifiée par la règle de la discipline (`validerResultat()`). Une déclaration impossible est refusée directement. Exemples : pas de nul au basket ni sur Valorant, une équipe Valorant doit atteindre au moins 13 rounds.
- Quand les deux capitaines ont déclaré, l'application compare les scores :
  - identiques → le match passe à `valide`, le score est copié dans `matchs`
  - différents → le match passe à `litige` et le créateur est notifié
- Le passage à `valide` met automatiquement à jour le classement et les statistiques, puisqu'ils sont calculés à la volée.

---

## Phases du projet

### Phase 1 : site web PHP (architecture MVC)

- Authentification (inscription, connexion, déconnexion)
- Création et configuration de tournois
- Inscription aux tournois publics et privés
- Déclaration des scores et statistiques par les capitaines
- Validation automatique et gestion des litiges (machine à états des matchs)
- Affichage des matchs, du classement et des statistiques
- Mise en place du pattern Strategy pour les disciplines

### Phase 2 : API REST

- Transformation des contrôleurs pour renvoyer du JSON
- Routes versionnées (`/api/v1/...`)
- Authentification par token (JWT)
- Gestion des erreurs avec codes HTTP et messages cohérents
- Les couches service et repository ne changent pas

Exemples de routes :

| Méthode | Route | Description |
|---|---|---|
| POST | `/api/v1/auth/login` | Connexion |
| GET | `/api/v1/tournois?visibilite=public` | Liste des tournois publics |
| POST | `/api/v1/tournois` | Créer un tournoi |
| POST | `/api/v1/tournois/{id}/rejoindre` | Rejoindre (avec code si privé) |
| GET | `/api/v1/tournois/{id}/classement` | Classement |
| GET | `/api/v1/tournois/{id}/stats` | Statistiques |
| PUT | `/api/v1/matchs/{id}/declaration` | Déclarer ou corriger un score (capitaine uniquement) |
| PUT | `/api/v1/matchs/{id}/arbitrage` | Fixer le score d'un match en litige (créateur uniquement) |
| GET | `/api/v1/tournois/{id}/litiges` | Matchs en litige (créateur uniquement) |

### Phase 3 : application cliente

- Application mobile ou web (SPA) qui consomme l'API
- Mêmes fonctionnalités que le site de la phase 1
- Aucune logique métier côté client : tout reste dans l'API

---

## Structure du projet

```
/
├── public/
│   └── index.php              Point d'entrée unique (front controller)
├── src/
│   ├── Controller/            Réception des requêtes
│   ├── Service/               Logique métier
│   ├── Repository/            Accès aux données
│   ├── Entity/                User, Tournoi, Equipe, Match...
│   └── Regle/
│       ├── RegleDiscipline.php
│       ├── RegleFactory.php
│       ├── ScoreParButs.php
│       ├── RegleFoot.php
│       ├── RegleBasket.php
│       ├── RegleValorant.php
│       └── RegleFifa.php
├── templates/                 Vues HTML (phase 1)
├── config/
├── database/
│   └── schema.sql
└── README.md
```

---

## Stack technique

| Élément | Technologie |
|---|---|
| Back-end | PHP 8 |
| Base de données | MySQL |
| Front phase 1 | HTML / CSS / JavaScript |
| API phase 2 | PHP (REST, JSON, JWT) |
| Client phase 3 | *À définir* |

---

## Installation

*À compléter.*

```bash
git clone <url-du-repo>
cd <nom-du-projet>
# importer database/schema.sql dans MySQL
# configurer config/ avec les identifiants de la base
# lancer le serveur : php -S localhost:8000 -t public
```

---

## Équipe

| Membre | Rôle |
|---|---|
| *À compléter* | |
