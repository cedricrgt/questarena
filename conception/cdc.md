# Cahier des Charges - GamerChallenges

## 1. Présentation du Projet

GamerChallenges est une plateforme web dédiée aux défis de jeux vidéo permettant aux utilisateurs de proposer, participer et voter pour des challenges variés. L'objectif est de créer une communauté dynamique et engageante où les joueurs de tous niveaux peuvent se mesurer les uns aux autres, partager leurs exploits vidéoludiques et gagner en reconnaissance au sein de la communauté.

La plateforme sera développée selon une architecture MVC en micro-services, avec un front-end React, un back-end NestJS et une base de données relationnelle gérée via Prisma. Cette architecture permettra une évolutivité optimale et une maintenance facilitée.

## 2. Définition des Besoins et Objectifs

### Besoins identifiés

- Les joueurs cherchent à démontrer leurs compétences au-delà des systèmes intégrés aux jeux
- Manque d'espace centralisé pour proposer et relever des défis cross-jeux
- Difficulté à trouver des challenges créatifs et originaux
- Besoin de reconnaissance et de valorisation pour les performances de jeu
- Manque d'outils pour partager facilement des exploits vidéos

### Objectifs du projet

- Créer une plateforme intuitive et responsive pour proposer et relever des défis
- Établir un système de validation par vidéo des challenges réalisés
- Mettre en place un mécanisme de votation transparent et équitable
- Développer une communauté active et bienveillante de joueurs
- Offrir une visibilité aux créateurs de contenus via un tableau des leaders
- Assurer une expérience utilisateur fluide sur tous les appareils

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

1. Page d'accueil avec présentation de GamerChallenges et mise en avant des défis populaires
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

## 6. Architecture du Projet

### Architecture MVC en micro-services

L'architecture choisie est une architecture MVC (Modèle-Vue-Contrôleur) implémentée via des micro-services, permettant:

- Séparation des préoccupations: isoler la logique métier, la présentation et le contrôle
- Scalabilité horizontale: possibilité de déployer et scaler indépendamment les différents services
- Maintenance facilitée: modification d'un service sans impacter les autres
- Résilience: tolérance aux pannes et isolation des problèmes
- Déploiement continu: mise à jour des services sans interruption globale

### Structure des micro-services

1. Service Authentification: gestion des utilisateurs, sessions, et sécurité
2. Service Challenges: gestion des défis (création, modification, recherche)
3. Service Participations: gestion des soumissions et vidéos
4. Service Votation: système de votes et classements
5. Service Médias: stockage et traitement des fichiers médias
6. API Gateway: point d'entrée unifié pour le front-end

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
