# QuestsArena – Dossier de projet CDA

Cédric Ragot – O’CLOCK

## Sommaire
1. Présentation du projet
   1.1 Le projet
   1.2 Cahier des charges
   1.3 Gestion du projet
   1.4 Équipe et rôles
2. Analyse
   2.1 Diagramme de cas d’utilisation
   2.2 Maquettes
3. Base de données
   3.1 Modèle conceptuel de données
   3.2 Modèle physique de données
   3.3 Sécurité des données
4. Conception
   4.1 Wireframes
   4.2 Architecture
   4.3 Diagramme de séquence détaillé
   4.4 Sécurité
5. Développement
   5.1 Frontend
   5.2 Backend
   5.3 Utilisation de TypeScript
   5.4 Tests
6. Test et qualité
   6.1 Introduction
   6.2 Stratégie de test
   6.3 Framework utilisé : Jest et Cypress
   6.4 Exemple de tests
7. Intégration continue et gestion des versions
   7.1 Processus de revue de code
   7.2 Déploiement et DevOps
8. Problèmes rencontrés et solutions
9. Conclusion et perspectives

---

## 1. Présentation du projet

### 1.1 Le projet
**QuestsArena** est une plateforme web dédiée aux défis de jeux vidéo permettant aux utilisateurs de proposer, participer et voter pour des challenges variés. L'objectif est de créer une communauté dynamique et engageante où les joueurs de tous niveaux peuvent se mesurer les uns aux autres, partager leurs exploits vidéoludiques (preuves vidéo) et gagner en reconnaissance au sein de la communauté.

Le projet est né du constat que les joueurs cherchent souvent à démontrer leurs compétences au-delà des systèmes de succès intégrés aux jeux vidéo (trophées, platines). Il manquait un espace centralisé pour proposer et relever des défis "cross-jeux" (inter-jeux). L’objectif principal de QuestsArena est donc de combler ce vide avec un système de validation par vidéo, un mécanisme de votation transparent et un tableau des leaders.

### 1.2 Cahier des charges
Le cahier des charges a conditionné le Minimum Viable Product (MVP) ainsi que la stack technique :

**Objectifs fonctionnels majeurs :**
- **Inscription & Authentification :** Accès sécurisé via JWT avec distinction des rôles (Utilisateur, Modérateur, Administrateur).
- **Création de Challenges :** Formulaire de soumission détaillé (règles, description, jeu concerné).
- **Participations & Preuves Vidéos :** Les utilisateurs peuvent soumettre des liens YouTube prouvant la réussite d'un défi.
- **Système de Votation :** Vote limité à un seul par utilisateur pour soutenir les défis les plus intéressants ou les meilleures participations.
- **Classement (Leaderboard) :** Système automatique mettant en avant les créateurs et joueurs ayant reçu le plus de votes.

**Objectifs et contraintes techniques :**
- **Frontend (App Router) :** Développé avec Next.js (React), Tailwind CSS pour assurer de hautes performances et un bon référencement naturel grâce au rendu côté serveur (SSR).
- **Backend (API) :** API REST en Node.js propulsée par le framework orienté objet NestJS.
- **Base de données :** PostgreSQL orchestré via l'ORM Prisma pour assurer l'intégrité relationnelle et un typage strict avec TypeScript.
- **Conteneurisation (DevOps) :** Utilisation de Docker et `docker-compose` pour centraliser les environnements (Database, Backend, Frontend, Prisma Studio, proxy Caddy).

### 1.3 Gestion du projet et Méthodologie Agile

Le projet a été mené selon un cycle de développement itératif et incrémental fortement inspiré des préceptes Agiles. Ce choix était indispensable face à un MVP (Minimum Viable Product) qui devait rapidement prouver sa valeur. Ainsi, la première itération "zéro" a consisté en un sprint de conception orienté sur la stabilisation de la pile technologique, l’élaboration structurée de l’ERD (Entity Relationship Diagram) et le développement des wireframes.

Afin d'encadrer rigoureusement la production sans alourdir le processus, nous avons opté pour le cadriciel **Kanban**. Historiquement issu de l'industrie, le kanban appliqué au développement logiciel permet un flux tendu visuel. Contrairement à Scrum qui verrouille un périmètre fonctionnel pendant deux semaines, Kanban nous a offert la latitude de réorganiser nos priorités quotidiennement selon les imprévus techniques.

**Le cycle de vie d'une tâche (User Story) était délibérément simplifié autour de 3 étapes clés :**
1. **To Do** : La tâche ou l'idée (par exemple : "Ajouter un système de notation aux défis") est créée, priorisée et affectée à un membre de l'équipe.
2. **In Progress** : Le développement actif. Dès qu'un développeur commence à coder la fonctionnalité, la carte est déplacée ici pour indiquer visuellement sur quoi l'équipe travaille au jour le jour.
3. **Merge** : La fonctionnalité est terminée. Le code est fusionné (mergé) dans la branche principale (`main`) et la tâche est définitivement clôturée.

Les cérémonies mises en place étaient adaptées au travail à distance et asynchrone :
- **Dailies asynchrones** : Échanges rapides et quotidiens sur Discord pour acter des avancements et, surtout, identifier les points de blocage ("Pain points").
- **Revues de sprint (Démos)** : Réunions régulières validant le ressenti visuel des maquettes ou le bon fonctionnement des endpoints API fraîchement construits.
- **Rétrospectives** : Moments vitaux d'auto-critique qui ont souvent mené à des ajustements de priorités (par exemple, concentrer l'effort sur la sécurité JWT avant l'implémentation algorithmique du "Leaderboard").

La méthode Agile (via le tableau Kanban hébergé sur GitHub) a permis de conserver une traçabilité parfaite. L'historique des tâches a garanti une progression structurée, itérative, et a protégé l'équipe de l'effet "tunnel" (ne présenter le produit final qu'à la toute dernière minute).

### 1.4 Équipe et rôles
L'équipe était pluridisciplinaire et chaque membre a pu toucher à l'ensemble de la pile technique ('Fullstack'), mais les rôles formels et spécialités se répartissaient ainsi au sein du projet :
- **Lead Back** : Cédric (Mise en place de l'API NestJS, conception de la base de données Prisma, gestion DevOps et sécurité).
- **Lead Front** : Lyndon (Réalisation des maquettes, intégration du framework Next.js et des composants Tailwind).
- **Product Owner** : Lauréanne (Définition du besoin, rédaction des exigences et priorisation des tâches).
- **Git Master** : Lyndon (Gestion de l'arborescence du dépôt, politique de branches et résolution critique de conflits).
- **Scrum Master** : Hugo (Fluidification du flux de travail, animation des rituels de synchronisation, d'estimation et suivi Kanban).

---

## 2. Analyse

### 2.1 Diagramme de cas d’utilisation
*(Insérer ici l'image de votre diagramme de cas d'utilisation)*
- **[Chemin suggéré pour l’image lors de la mise en page : `./assets/diagramme_cas_utilisation.png` ou Annexe "Diagramme d'activité"]**

Le diagramme illustre les permissions par "acteur" (rôle) :
- **Visiteur** : Peut consulter la liste des défis, le classement et voir la preuve vidéo d'une participation.
- **Utilisateur connecté** : Peut créer un challenge, soumettre une participation vidéo, voter et gérer son profil.
- **Administrateur** : Peut bloquer un utilisateur, ou valider/invalider des participations.

### 2.2 Maquettes
*(Insérer ici les images de vos maquettes / UI finales)*
- **[Chemin suggéré pour l’image lors de la mise en page : `./assets/maquette_accueil.png` et `./assets/maquette_mobile.png` ou Annexe "Maquettes"]**

Le composant graphique s'articule autour d'une esthétique "Gamer" incluant des effets "Neon" et colorés afin de correspondre au public visé.

---

## 3. Base de données

### 3.1 Méthode MERISE et Modèle conceptuel de données (MCD)

La conception du socle de données est sans doute l'étape la plus critique du développement applicatif. Une erreur à ce stade se propage dans tous les étages du code (du backend jusqu'au frontend). C'est pourquoi nous avons abordé la modélisation sous l'angle de la **Méthode Merise**.

**Qu'est-ce que la méthode Merise ?**
Créée en France dans les années 70, Merise est une méthode de modélisation systémique qui se distingue radicalement des diagrammes de classes UML par sa stricte séparation entre :
- Les données (qui sont statiques et stockées : c'est notre MCD).
- Les traitements (qui sont portés par notre code métier).

Avant de dessiner la moindre table, la conception Merise a exigé l'établissement d'un **Dictionnaire de données** et de **Règles de Gestion (RG)**. Par exemple, pour l'application QuestsArena, nous avons statué sur la règle suivante : *"Un utilisateur peut héberger de zéro à N défis, mais un défi appartient strictement à un et un seul créateur"*. C'est cette formalisation sémantique qui nous a permis de justifier nos cardinalités d'association sans ambiguité (0,N - 1,1).

Le Modèle Conceptuel de Données (MCD) est l'aboutissement de cette réflexion, symbolisant une représentation abstraite et visuelle de notre système d'information.

#### Erreurs de conception (et solutions apportées)
Durant cette première itération conceptuelle (MCD version 1), nous avons commis certaines maladresses standard :
*   **L'erreur d'entité croisée (Relation Many-to-Many brute)** : Initialement, notre réflexion nous poussait à associer un nombre incalculable d'utilisateurs directement au modèle "VOTE". Or, modéliser le fait qu'un utilisateur vote "Pour" un défi ou une "Participation" de manière directe engendrait un stockage d'attributs multiples impossibles à gérer dans des colonnes standard.
*   **La solution (Épuration vers la 3ᵉ Forme Normale)** : Nous avons appliqué la règle Merise stipulant que tout "Attribut Porté par une Association de plusieurs-à-plusieurs" doit être basculé physiquement via une table charnière (ou associative). C'est pourquoi la participation ne pouvait plus être un vague concept, mais est devenue une Entité/Modèle propre, portant ses Metadata (liens YouTube, Date de création) au format relationnel et identifiée grâce à une clé primaire composée.

*(Insérer ici l'image de l'ERD / MCD initial corrigé)*
- **[Chemin suggéré pour l’image lors de la mise en page : `./assets/ERD.png` ou Annexe "ERD"]**

### 3.2 Modèle physique de données et ORM
Contrairement à une modélisation SQL brute, nous utilisons Prisma comme ORM pour générer et maintenir la structure PostgreSQL. 
L'ORM convertit notre schéma en tables sécurisées. 
Voici un extrait du schéma définissant le cœur du projet (Modèle Physique) tiré du fichier `schema.prisma` :

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}

model User {
  id             String          @id @default(uuid())
  userName       String          @unique
  email          String          @unique
  password_hash  String
  avatar_url     String
  role           Role            @default(USER)
  challenges     Challenge[]     @relation("CreatedChallenges")
  participations Participation[]
}

model Challenge {
  id          String     @id @default(uuid())
  title       String
  description String
  rules       String
  game        String
  difficulty  Difficulty
  user_id     String
  validated   Boolean
  creator     User       @relation("CreatedChallenges", fields: [user_id], references: [id], onDelete: Cascade)
  participations Participation[]
}
```
Ce modèle force l'intégrité (les challenges ont une clé étrangère `user_id` en `CASCADE` si l'utilisateur est supprimé).

### 3.3 Sécurité des données
La conformité et la sécurité des données reposent sur plusieurs méthodes :
- **Protection des données personnelles :** Un travail a été effectué pour gérer le stockage des mots de passe.
- **Hachage bcrypt :** Les mots de passe ne sont jamais insérés en clair grâce au service d'authentification.
- **Intercepteurs (Sanitisation) :** Avant de renvoyer l'objet Utilisateur à une route GET, un intercepteur côté NestJS supprime récursivement la propriété `password_hash` pour l'ensemble des réponses renvoyées.

---

## 4. Conception

### 4.1 Wireframes
*(Insérer ici les wireframes basse fidélité de la phase d'idéation)*
- **[Chemin suggéré pour l’image lors de la mise en page : `./assets/wireframes.png` ou Annexe "Wireframes"]**

### 4.2 Architecture
L’architecture repose sur une division stricte Front/Back conteneurisée :
*(Insérer ici le Diagramme d'architecture MVC/Micro-services)*
- **[Chemin suggéré pour l’image lors de la mise en page : `./assets/diagramme_architecture.png`]**

- **Frontend (Next.js) :** Serveur de front-end effectuant le rendu SSR pour le SEO, puis hydratant les composants interactifs sur le navigateur du client.
- **Backend (NestJS) :** Architecture MVC modulaire isolant l'API, les services métier (User, Challenge, Vote), et les DTOs (Data Transfer Objects).
- **PostgreSQL :** Base de données relationnelle persistée via le montage d'un volume de datas.

### 4.3 Diagramme de séquence détaillé
*(Insérer ici le diagramme de séquence pour l'authentification ou le vote)*
- **[Chemin suggéré pour l’image lors de la mise en page : `./assets/diagramme_sequence.png`]**

### 4.4 Sécurité (Guards et JWT)
NestJS apporte une couche de sécurité fine via les "Guards". Lors d'une requête protégée, le `JwtAuthGuard` vérifie la validité du Token JWT fourni par l'en-tête client :

```typescript
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant ou invalide');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalide');
    }
  }
}
```

---

## 5. Développement

### 5.1 Frontend (Next.js & React)
Le Frontend construit l'interface avec React et stylise l'application avec Tailwind CSS directement injecté dans le composant. Voici l’entrée principale du composant de la page d'accueil (`page.tsx`) gérant la logique des appels API réutilisables (Fetch) et le rendu conditionnel du Leaderboard :

```tsx
"use client";

import { useEffect, useState } from "react";
import ChallengeCard from "./components/challengeCard/challengeCard";
import Leaderboard from "./components/leaderboard/leaderboard";
import { Challenge, LeaderboardType } from "@/types";
import { apiFetch } from "@/lib/api";

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/user/leaderboard").then(setLeaderboard);
    apiFetch("/challenge").then(setChallenges).finally(() => setLoading(false));
  }, []);

  const visibleChallenges = challenges.filter(c => (c.participations?.length ?? 0) > 0).slice(0, 6);

  return (
    <section className="w-full max-w-6xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold uppercase tracking-wider text-secondary">
        Défi tendance
      </h2>
      
      {loading ? (
        <div className="animate-pulse">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} id={challenge.id} />
          ))}
        </div>
      )}
      
      <Leaderboard leaderboard={leaderboard} />
    </section>
  );
}
```

### 5.2 Backend (NestJS Controller)
L'API REST est exposée grâce aux contrôleurs NestJS. Les méthodes métier principales sont gérées dans les contrôleurs (les endpoints) pour déléguer la logique directement aux Services. Exemple avec le `ChallengeController` :

```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { JwtAuthGuard } from '../auth-guard/jwt-auth.guard';
import { ChallengeOwnershipGuard } from './challenge-ownership.guard';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengeService.create({ ...createChallengeDto });
  }

  @Get()
  findAll() {
    return this.challengeService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ChallengeOwnershipGuard)
  remove(@Param('id') id: string) {
    return this.challengeService.remove(id);
  }
}
```

**Fonctionnement de ce contrôleur :**
Dans cet extrait, le décorateur `@Controller('challenge')` définit la route racine de l'API pour la gestion des défis. Ce contrôleur utilise l'injection de dépendances dans son constructeur pour accéder aux méthodes du `ChallengeService`, ce qui garantit une séparation nette entre le point d'entrée HTTP (le contrôleur) et la véritable logique métier (le service).

Les décorateurs `@Post()`, `@Get()` et `@Delete()` permettent d'associer automatiquement chaque fonction au bon verbe HTTP. De plus, la sécurité est intégrée de façon très lisible et déclarative grâce aux "Guards" : pour créer ou supprimer un défi, la route passe d'abord par le `JwtAuthGuard` (qui contrôle l'authentification). Pour la suppression en particulier, le `ChallengeOwnershipGuard` ajoute une couche supplémentaire pour vérifier que l'utilisateur connecté est bien le créateur du défi à supprimer.

### 5.3 Utilisation de TypeScript
L'usage de TypeScript est central et indispensable aux deux socles du projet :
- **Backend** : il intervient lors de la définition des DTO (Data Transfer Objects) pour valider automatiquement la forme (Schéma) de la requête entrante.
- **Frontend** : il type tous les retours d'API (`<Challenge>`, `<LeaderboardType>`) ce qui permet à l'autocomplétion (IntelliSense) de prévenir d’éventuelles erreurs de propriétés pendant la saisie des composants.

### 5.4 Tests
Voir la section 6.

---

## 6. Test et qualité

### 6.1 Introduction
QuestsArena embarque une suite de tests unitaires et d'intégration (via Jest pour le Backend NestJS) ainsi que l'infrastructure de tests e2e pour garantir que les évolutions n'entachent pas la stabilité du produit.

### 6.2 Stratégie de test
- **Tests unitaires NestJS** : Isolent les Controllers en utilisant des dépendances simulées ("mocks") au niveau du Service.

### 6.3 Framework utilisé : Jest
Exemple du test unitaire confirmant la bonne structure de la méthode `leaderboard()` du `UserController` :

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService = { getLeaderboard: jest.fn() }; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('leaderboard', () => {
    it('doit renvoyer les tops utilisateurs', async () => {
      const mockResult = [{ userName: 'topuser', score: 100 }];
      (mockUserService.getLeaderboard as jest.Mock).mockResolvedValue(mockResult);

      const result = await controller.leaderboard();
      expect(result).toEqual(mockResult);
      expect(mockUserService.getLeaderboard).toHaveBeenCalledWith(10);
    });
  });
});
```

**Explication de la suite de tests :**
Ce fichier garantit que le contrôleur de gestion des utilisateurs fonctionne de manière fiable.
Nous utilisons la méthode `Test.createTestingModule` (fournie par NestJS) dans notre bloc `beforeEach` pour instancier notre contrôleur dans un environnement isolé. Plutôt que de solliciter la véritable base de données (ce qui ralentirait les tests et introduirait de la variabilité), nous injectons une fausse dépendance `mockUserService` simulant les réponses et méthodes du `UserService` : c'est le principe du "Mocking" avec Jest.

Le "describe" et le "it" permettent de structurer et de documenter le comportement métier attendu. Dans ce test précis sur la fonctionnalité du "leaderboard", nous vérifions deux points cruciaux :
- L'assertion `expect(result).toEqual(mockResult)` garantit que le contrôleur renvoie fidèlement les données simulées.
- L'assertion `expect(...).toHaveBeenCalledWith(10)` vérifie en coulisses que le contrôleur passe bien l'argument de limite par défaut "10" au service, confirmant que le lien entre le contrôleur et la couche métier de données est correctement paramétré.

---

## 7. Intégration continue et gestion des versions

### 7.1 Processus de revue de code
Nous avons utilisé Git et GitHub comme base de travail collaboratif. L'équipe devait suivre une méthode de conventions de branches (`feature/*`, `fix/*`, `refactor/*`). Avant et après résolution des conflits, la validation locale des builds s'effectuait avant l'incorporation à la branche principale (`main`).

### 7.2 Déploiement CI/CD et Hébergement o2switch (Production)

Bien que l'essentiel du développement ait été conteneurisé sous Docker afin d’assurer l’isomorphisme pour l'équipe technique, l'aboutissement professionnel de la phase de conception consiste en la libération (release) du produit final sur un environnement Web accessible au public. Pour QuestsArena, ce passage en "production mutualisée sécurisée" a été exécuté sur les serveurs français d'**o2switch**.

#### Différences d'architectures (Dev Vs Prod)
En phase de développement (Dev), QuestsArena fonctionne grâce à une solution de virtualisation embarquée (`docker-compose.yml`), qui inclut un service Base de Données (PostgreSQL), notre API en NestJS et notre frontend Next.js.
Le saut en mode production imposait de s'extirper de ce modèle lourd pour profiter de l'architecture physique du client :
- Une base de données migrée en dur sur le C-Panel.
- Un serveur web Node géré par Phusion Passenger.

#### Déploiement pas-à-pas sur o2switch (cPanel)
Le choix de l'hébergeur o2switch demande une maîtrise des interfaces `cPanel` liées à l'écosystème Node.js. 

**Étape 1 : Allocation de la Base de données**
Plutôt qu'un conteneur persistant, une véritable base PostgreSQL/MySQL (au choix du serveur) a été instanciée depuis l’interface de l'hébergement, avec attributions de privilèges distants. L'URL résultante de cette nouvelle Database o2switch a été scellée dans l'environnement de production.

**Étape 2 : Configuration du Backend via 'Setup Node.js App'**
o2switch dispose d’un gestionnaire Node.js embarqué. En utilisant cet outil, j'ai pointé la racine du répertoire vers la structure NestJS. J'ai configuré :
- La version de Node correspondante (V18/V20).
- Le script de démarrage initialisé en exécution (PM2/Passenger en coulisse) afin de relancer le service backend silencieusement au moindre "crash".
- **Variables Sécurisées** : Les clés cryptographiques (`JWT_SECRET`, la clé API Prisma) ont été chargées sous forme paramédicale dans les Variables d'Environnement de ce "Setup Node.js", de sorte que le code source soit expurgé de toute donnée sensible.

**Étape 3 : Build du Frontend Next.js**
Sur l'espace d'hébergement, le rendu asynchrone côté serveur (SSR) et la sécurité apportés par le "App Router" de Next15 justifient le maintien d'un serveur. Nous avons procédé à son build final (`npm run build`). L'architecture a ensuite été liée avec le domaine principal via routage proxy d'o2switch (fichier de conf invisible géré nativement via les redirections `.htaccess`), permettant d'allier un Backend opérationnel API sur un port distant avec une distribution grand public HTTPS rapide du Front.

---

## 8. Problèmes rencontrés et solutions

**Choix de l'architecture :**
Plutôt que des répertoires Node/Express désorganisés, le passage au Framework NestJS a été imposé pour structurer l'application via Injection de Dépendance (Service-Controller). Gérer les relations complexes d'un écosystème de compétition : Challenges, Participations et Votes exigeait une séparation de responsabilité parfaite.

**Base de Données et Prisma sous Docker :**
Certaines divergences d'architectures entre Mac/Windows sur les machines de l'équipe causaient des conflits binaires sur les modules Prisma natifs et TailwindsCSS (Rust bindings). 
*Solution* : Forcer l'exécution de toutes les commandes `npm install` et `prisma db push` à l'intérieur exclusif du conteneur Backend Docker partagé (Node Alpine Linux) et redéfinir correctement les volumes.

**Synchronisation du travail Front/Back :**
Le grand nombre de validations sur le dépôt principal causait occasionnellement des collisions sur certains fichiers critiques. 
*Solution* : Mise en place de conventions de validations strictes ("pair programming" lors des merges) et documentation de la nomenclature via le carnet de bord.

---

## 9. Conclusion et perspectives

Le projet QuestsArena a permis d'aboutir à une solution solide et professionnelle, répondant de manière concrète aux attentes des joueurs soucieux de se mesurer à travers des défis inter-jeux. Cette application nous a permis de consolider l'ensemble d'une pile technique (Stack) actuelle :
- L'utilisation de NestJS pour mettre en place un pipeline de validation de données (Guards, Interceptors).
- La conception via Prisma d'un modèle abstrait mais sécurisé pour Postgres.
- Du Server-Side Rendering complet côté client via Next.js assurant un SEO qualitatif.

Si l’infrastructure devait être propulsée à une échelle plus vaste, nos évolutions (Feature Requests) en attente seraient :
- Le système de notifications dynamiques (via Websockets) dès la réception d'un Vote ou d'une Validation sur l'application.
- Une dimension asynchrone pour la structuration de guildes et d'événements temporaires (Saisons).
- L'intégration d'un pipeline complet (Jenkins ou GitLab CI) pour basculer ce `docker-compose` en intégration réellement continue.

QuestsArena est un accomplissement technique global et témoigne des compétences du concepteur et développeur dans sa capacité à produire une architecture Micro-service / Fullstack maintenable.
