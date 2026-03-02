# Cahier des Charges - QuestsArena

## 1. Contexte et Opportunité Business

### Contexte du marché

Le marché du gaming représente plus de 180 milliards de dollars en 2024, avec une communauté mondiale de plus de 3 milliards de joueurs. Les plateformes de streaming (Twitch, YouTube Gaming) et les réseaux sociaux gaming connaissent une croissance exponentielle.

Cependant, il existe un manque d'outils dédiés permettant aux joueurs de :

- Créer et partager des défis créatifs cross-plateformes
- Prouver leurs compétences au-delà des systèmes de succès intégrés aux jeux
- Être reconnus pour leurs exploits dans une communauté centralisée

### Opportunité identifiée

QuestsArena vise à combler ce vide en créant une plateforme web dédiée aux défis de jeux vidéo, permettant aux utilisateurs de proposer, participer et voter pour des challenges variés. L'objectif est de créer une communauté dynamique et engageante où les joueurs de tous niveaux peuvent se mesurer les uns aux autres, partager leurs exploits et gagner en reconnaissance.

### Positionnement

**QuestsArena se positionne comme :**

- Un hub centralisé pour les défis gaming cross-plateformes
- Une alternative créative aux systèmes de succès traditionnels
- Un espace de valorisation des compétences gaming
- Une plateforme communautaire avec gamification poussée

### Approche technique

La plateforme sera développée selon une architecture moderne et scalable :

- **Frontend** : React + TypeScript pour une expérience utilisateur réactive
- **Backend** : NestJS avec architecture modulaire micro-services
- **Database** : PostgreSQL + Prisma pour la fiabilité et le type-safety
- **Infrastructure** : Docker, CI/CD, déploiement cloud

Cette stack permettra une évolutivité optimale, une maintenance facilitée et un développement efficace en solo.

## 2. Analyse du Besoin et Objectifs Business

### Problématiques utilisateurs identifiées

**Pain points des joueurs :**

- Frustration de ne pas pouvoir prouver leurs compétences au-delà des systèmes de succès intégrés aux jeux
- Absence d'espace centralisé pour proposer et relever des défis cross-plateformes
- Difficulté à trouver des challenges créatifs et originaux
- Manque de reconnaissance pour les performances exceptionnelles
- Complexité pour partager et valoriser des exploits vidéo

**Besoins non satisfaits :**

- Validation sociale des compétences gaming
- Espace de créativité pour inventer des défis uniques
- Système de réputation gaming cross-jeux
- Communauté engagée autour de la compétition saine

### Objectifs Business

**Objectifs court terme (MVP - 3 mois) :**

- Lancer une plateforme fonctionnelle avec les features core
- Acquérir 100 utilisateurs beta-testeurs actifs
- Valider le product-market fit
- Obtenir un taux d'engagement > 40% (utilisateurs revenant chaque semaine)

**Objectifs moyen terme (6-12 mois) :**

- Atteindre 1000 utilisateurs actifs mensuels
- Générer 50+ nouveaux challenges par mois
- Établir des partenariats avec des streamers/créateurs de contenu
- Implémenter la monétisation (premium features, publicité non-intrusive)

### Objectifs Produit

- **UX** : Créer une plateforme intuitive et responsive, temps d'onboarding < 2 minutes
- **Validation** : Établir un système de validation par vidéo fiable et rapide
- **Engagement** : Mettre en place un mécanisme de votation transparent et gamifié
- **Communauté** : Développer une communauté active et bienveillante (modération efficace)
- **Visibilité** : Offrir une reconnaissance via tableau des leaders, badges, statistiques
- **Performance** : Assurer une expérience fluide sur tous les appareils (< 3s de chargement)

## 3. Fonctionnalités du Projet

### Gestion des utilisateurs

- Inscription et authentification sécurisée des utilisateurs
- Profils personnalisables avec statistiques et historique
- Système de rôles (utilisateur standard, modérateur, administrateur)

### Gestion des challenges

- Création et soumission de défis avec règles détaillées
- Catégorisation par jeu, difficulté et type de défi
- Validation et modération des challenges proposés

### Participation aux défis

- Partage des vidéos
- Validation automatique et manuelle des soumissions
- Historique des participations par utilisateur

### Système de votation

- Vote pour les défis les plus intéressants
- Vote pour les meilleures réalisations de défis
- Protection contre les fraudes et manipulation des votes

### Classements et récompenses

- Tableau des leaders par jeux et global
- Système de points et badges d'accomplissement
- Historique des performances

### Interface utilisateur

- Interface responsive et intuitive
- Navigation simplifiée et accessible
- Design attractif adapté à la communauté gaming

## 4. MVP (Minimum Viable Product)

Le MVP comprendra les fonctionnalités essentielles permettant aux utilisateurs de proposer, participer et voter pour des défis:

1. Page d'accueil avec présentation de QuestsArena et mise en avant des défis populaires
2. Système d'inscription et connexion (création de compte, authentification)
3. Profil utilisateur basique (informations personnelles, avatar)
4. Création de challenges (formulaire de soumission avec titre, description, règles, jeu concerné)
5. Page de détail d'un challenge (description, règles, vidéos des participants)
6. Système de participation (partagé de vidéos comme preuve de réalisation)
7. Système de vote simple pour les défis et les participations
8. Tableau des leaders basique (classement selon points obtenus)
9. Recherche simple des défis par jeu ou titre
10. Administration basique pour la validation des contenus

## 5. Évolutions Potentielles

Fonctionnalités prévues pour les phases ultérieures:

1. Système de commentaires sur les défis et participations
2. Filtres de recherche avancés (par popularité, difficulté, date, etc.)
3. Système de récompenses avec badges et niveaux d'expérience
4. Notifications en temps réel pour les nouveaux défis et votes
5. Abonnements à des utilisateurs ou catégories de jeux
6. Messagerie interne entre utilisateurs
7. Modération communautaire avec signalement des contenus inappropriés
8. Optimisation des vidéos (compression, streaming adaptatif)
9. Calendrier d'événements et défis temporaires
10. Dashboard utilisateur avec statistiques détaillées
11. Système de clans/équipes pour défis collaboratifs
12. Support multilingue (français, anglais minimum)

## 6. Architecture Technique

### Choix d'architecture : Modulaire et Évolutive

L'architecture choisie est une **architecture modulaire** inspirée des micro-services, adaptée pour un développement solo tout en préservant la scalabilité future.

**Avantages de cette approche :**

- **Séparation des préoccupations** : isolation de la logique métier, présentation et contrôle
- **Scalabilité progressive** : possibilité d'extraire des modules en micro-services indépendants plus tard
- **Maintenance facilitée** : modification d'un module sans impacter les autres
- **Développement solo efficace** : monorepo avec modules découplés, déploiement simplifié
- **Évolutivité** : migration facile vers une architecture distribuée si besoin

### Structure Modulaire (Phase MVP)

**Backend NestJS - Architecture modulaire :**

1. **Module Auth** : authentification, autorisation, gestion des sessions JWT
2. **Module Users** : profils utilisateurs, statistiques, préférences
3. **Module Challenges** : CRUD des défis, catégorisation, recherche
4. **Module Participations** : soumissions vidéo, validation, historique
5. **Module Votes** : système de votes, classements, anti-fraude
6. **Module Media** : upload, validation, optimisation des fichiers
7. **Module Notifications** : système de notifications (email, in-app)

**Frontend React - Architecture par features :**

- Composants réutilisables (design system)
- Pages organisées par fonctionnalité
- State management (Context API / Zustand)
- API layer centralisé (Axios + React Query)

### Évolution vers Micro-services (Phase 2)

Si la croissance le justifie, migration progressive :

1. Extraction du service Media (traitement vidéo intensif)
2. Extraction du service Notifications (scalabilité indépendante)
3. API Gateway pour orchestration
4. Message broker (RabbitMQ/Redis) pour communication asynchrone

## 7. Technologies Utilisées

### Frontend

- **React**: bibliothèque JavaScript pour construire des interfaces utilisateur réactives
  - _Justification_: écosystème riche, performances optimales, communauté active
- **Tailwind CSS**: framework CSS utilitaire pour le design
  - _Justification_: développement rapide, personnalisation facile, taille optimisée
- **React Router**: gestion des routes côté client
  - _Justification_: navigation fluide sans rechargement de page
- **React Query**: gestion des états et du cache des requêtes
  - _Justification_: optimisation des performances et expérience utilisateur améliorée
- **Axios**: client HTTP pour les requêtes API
  - _Justification_: API simple et puissante, intercept des requêtes

### Backend

- **NestJS**: framework Node.js pour le backend
  - _Justification_: architecture modulaire, support TypeScript natif, extensibilité
- **Prisma**: ORM pour l'accès à la base de données
  - _Justification_: type-safety, migrations simplifiées, requêtes optimisées
- **Swagger**: documentation API automatisée
  - _Justification_: documentation interactive, tests simplifiés
- **JWT**: authentification par tokens
  - _Justification_: sécurité, stateless, adapté aux architectures distribuées
- **Express**: framework web minimaliste
  - _Justification_: flexible, rapide, base de NestJS

### Base de données

- **PostgreSQL**: système de gestion de base de données relationnelle
  - _Justification_: fiabilité, performances, support avancé de JSON

### Outils de développement

- **Docker**: conteneurisation des services
  - _Justification_: environnements consistants, déploiement simplifié
- **Git & GitHub**: gestion de versions et collaboration
  - _Justification_: suivi des modifications, revue de code, intégration CI/CD

## 8. Cible du Projet

### Public visé

- Joueurs passionnés de 16 à 35 ans, tous niveaux confondus
- Créateurs de contenu cherchant à mettre en valeur leurs compétences
- Communautés de jeux cherchant à organiser des défis internes
- Streamers et YouTubers souhaitant trouver des idées de challenges

### Caractéristiques de la cible

- Familiarité avec les interfaces gaming modernes
- Utilisation intensive des réseaux sociaux et plateformes de partage
- Appétence pour la compétition et la reconnaissance
- Utilisation multiple des appareils (PC, mobile, tablette)

### User Stories

| ID  | En tant que...           | Je veux...                                  | Afin de...                                                                                | Critères d'acceptation | Priorité |
| --- | ------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------- | -------- |
| 1   | Utilisateur non-connecté | Accéder à la page d'accueil                 | Consulter les défis                                                                       |                        |
| 2   | Utilisateur non-connecté | Accéder à la page d'acccueil                | Consulter le classement des utilisateurs ayant le + de vote                               |                        |          |
| 3   | Utilisateur non-connecté | Accéder à la page détails des défis         | Voir la description, les règles et les videos des participants                            |
| 4   | Utilisateur non-connecté | Accéder à la page d'inscription / connexion | Créer un compte ou se connecter                                                           |
| 5   | Utilisateur non-connecté | Accéder au tableau des leaders              | Pour consulter les utilisateurs ayant réalisé le plus de défis et obtenu le plus de votes |
| 6   | Utilisateur connecté     | Poster un challenge                         | soumettre un défi                                                                         |
| 7   | Utilisateur connecté     | Voter                                       | Élir les meilleurs défis                                                                  |
| 8   | Utilisateur connecté     | Voter                                       | Élir les meilleures participations pour chaque défi                                       |
| 9   | Utilisateur connecté     | Soumettre une participation (format vidéo)  | prouver la réalisation d'un challenge                                                     |

## 9. Arborescence

/ (Page d’accueil)
├── /leaderboard → Tableau des leaders
├── /featured → Défis en vedette
├── /challenge/:id (Page détail d’un challenge)
│ ├── /details → Description, règles, etc.
│ ├── /voter → Voter pour le challenge ou les participations
│ └── /soumettre → Soumission de participation (vidéo)
├── /challenge/nouveau → Création d’un nouveau challenge
├── /inscription → Page d’inscription
├── /connexion → Page de connexion
