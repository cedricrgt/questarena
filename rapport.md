

# GamerChallenges – Dossier de projet CDA 2025
### Cédric Ragot – École Hexagone

<div class="pagebreak"></div>

# Rapport de projet – GamerChallenges

## 1. Contexte et attentes métier

Le cahier des charges synthétise le besoin d’une plateforme communautaire où les joueurs peuvent créer des défis inter-jeux, poster une preuve vidéo et voter pour les meilleures performances, avec une expérience responsive et modérée (`conception/cdc.md:3-80`). Les fonctionnalités socles du MVP couvrent l’accueil éditorialisé, l’authentification, la création de challenges, la consultation détaillée (règles + participations), la soumission vidéo, le vote et un tableau des leaders (`conception/cdc.md:68-79`). Les évolutions prévues (commentaires, filtres avancés, notifications, système de clans) garantissent la projection long terme (`conception/cdc.md:81-120`).  
La conception des entités Utilisateur, Challenge, Participation et Vote (types, clés étrangères, contraintes) formalise un référentiel de données cohérent avec ces besoins (`conception/dictionnaire.md:1-46`), tandis que le carnet de bord retrace la progression du sprint 0 (choix de stack, production des maquettes, consolidation des diagrammes) et la collaboration synchrone sur Discord/LiveShare (`carnet-de-board.md:3-32`).

## 2. Gouvernance et démarche projet

Le projet est mené en mode agile/itératif : la première itération a stabilisé la stack NestJS + Prisma + PostgreSQL côté back et Next.js 15 côté front, produit l’ERD et les wireframes, puis intégré les retours pour garder un périmètre MVP réaliste (`carnet-de-board.md:3-32`). Les cérémonies mises en place sont :

- **Dailies asynchrones** : échanges rapides sur Discord pour identifier les blocages quotidiens (ex. choix d’API pour les jeux, `carnet-de-board.md:24-32`).
- **Revues de sprint** : validation du CDC, des wireframes et des diagrammes avec l’équipe pédagogique.
- **Rétrospectives** : ajustement des priorités (sécurité, cohérence entre dictionnaire et architecture).

La présence d’un dictionnaire des données, d’un plan de tests exhaustif (`plan_test_backend.md:1-199`) et du suivi des décisions outille les compétences « Contribuer à la gestion de projet informatique » du REAC (Bloc 1). Git et Docker/Compose servent de référentiels partagés, avec une convention de branches (`feature/*`, `fix/*`, `refactor/*`) qui facilite la revue et l’onboarding.

### 2.1 Gestion des risques

| Risque | Impact | Prévention |
| --- | --- | --- |
| Perte de données PostgreSQL | Arrêt des tests / régression | Volume Docker `./db`, migrations Prisma automatiques (`docker-compose.yml:31-38`). |
| Non-conformité RGPD | Blocage certification | Tâches dédiées (mentions légales, consentement explicite, suppression future). |
| Manque de tests e2e | Régressions front | Service `cypress` prêt à l’emploi dans le compose (`docker-compose.yml:94-110`). |

## 3. Bloc 1 – Développer une application sécurisée

### 3.1 Environnement de travail et socle technique

- **Conteneurs de dev** : `docker-compose.yml` instancie cinq services (frontend Next.js, backend NestJS, PostgreSQL, Prisma Studio, reverse-proxy Caddy) et exécute automatiquement les migrations/seed Prisma avant le `start:dev`, garantissant une parité prod/dev (`docker-compose.yml:1-88`).  
  ```yaml
  # docker-compose.yml
  services:
    frontend:
      build:
        context: ./frontend
      ports:
        - 5173:5173
    backend:
      build:
        context: ./backend
      command: >
        bash -c "npx prisma generate &&
                 npx prisma migrate deploy &&
                 npx prisma db push &&
                 npx prisma db seed &&
                 npm run start:dev"
    database:
      image: postgres:17-alpine
      healthcheck:
        test: ["CMD-SHELL", "pg_isready -U gamer -d gamerchallenge"]
  ```
- **Next.js 15 + Tailwind 4** : l’entrypoint encapsule Header/Footer, un provider d’authentification et le basculement de thème afin d’assurer un rendu accessible sur toutes les pages (`frontend/src/app/layout.tsx:1-27`).  
  ```tsx
  // frontend/src/app/layout.tsx
  export default function RootLayout({ children }: { children: ReactNode }) {
    return (
      <html lang="fr">
        <body className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white">
          <AuthProvider>
            <ThemeInitializer />
            <Header />
            <main className="flex-1">{children}</main>
            <div id="modal-root" />
            <Footer />
          </AuthProvider>
        </body>
      </html>
    );
  }
  ```
- **Typage et partage de modèles** : les types `Challenge`, `Participation`, `Vote` et `User` centralisent les attributs exposés aux composants et limitent les régressions (`frontend/src/types/index.ts:1-68`). ESLint + TypeScript strict sont activés des deux côtés (`frontend/package.json`, `backend/package.json`) afin de garantir un style cohérent.

### 3.2 Développement des interfaces utilisateurs

- **Parcours Auth** : les pages `signin` et `signup` gèrent les validations HTML5, affichent des feedbacks d’erreur et réutilisent le contexte d’authentification pour router l’utilisateur (`frontend/src/app/auth/signin/page.tsx:1-103`, `frontend/src/app/auth/signup/page.tsx:1-123`).  
- **Contextes & hooks partagés** : `AuthProvider` persiste le JWT, appelle `/auth/me`, rafraîchit le profil et force la déconnexion en cas de 401 (`frontend/src/lib/auth-context.tsx:1-187`). Le helper `apiFetch` sélectionne la bonne base URL (SSR vs client) et ajoute automatiquement le header `Authorization` (`frontend/src/lib/api.ts:1-28`).  
  ```tsx
  // frontend/src/lib/auth-context.tsx (extrait)
  async function login(data: { email: string; password: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Login failed");
    }
    const { accessToken } = await res.json();
    setToken(accessToken);
    const profile = await baseApiFetch("/auth/me", { method: "GET" });
    setUser({ id: profile.id, name: profile.name, email: profile.email, ...});
  }
  ```
- **UI métier** : les grilles de participations adaptent le layout en fonction du nombre d’items (`frontend/src/app/components/challengeDetail/ParticipationsGrid.tsx:1-35`), et chaque carte encapsule l’extraction de l’ID YouTube, la mise à l’échelle responsive et l’appel au composant de vote (`frontend/src/app/components/participationCard/participationCard.tsx:1-60`).  
  ```tsx
  // frontend/src/app/components/participationCard/participationCard.tsx
  const ParticipationCard = ({ link, title, nbVotes, participationId }: ParticipationCardProps) => {
    const extractIdVideo = (link: string) => {
      const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
      const match = link.match(regex);
      return match ? `https://www.youtube.com/embed/${match[1]}` : "";
    };
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-[95%] mx-auto max-w-sm min-h-[350px] text-black">
        <iframe className="absolute top-0 left-0 w-full h-full border-0" src={extractIdVideo(link)} />
        <p className="text-sm text-gray-600 px-2 mt-3 flex items-center">
          <VoteButton targetId={participationId} targetType="PARTICIPATION" />
          {nbVotes} votes
        </p>
      </div>
    );
  };
  ```
- **Interaction sécurisée** : `VoteButton` vérifie l’existence d’un vote pour éviter les doublons, gère l’annulation et notifie l’appelant via `onVoteChange`, tout en imposant la connexion préalable (`frontend/src/app/components/button/voteButton.tsx:1-84`).  
  ```tsx
  // frontend/src/app/components/button/voteButton.tsx
  useEffect(() => {
    if (!targetId || !user?.id) return;
    apiFetch("/vote/check", {
      method: "POST",
      body: JSON.stringify({ user_id: user.id, target_id: targetId, target_type: targetType }),
    }).then((res) => {
      setHasVoted(res.hasVoted);
      setVoteId(res.voteId);
    });
  }, [targetId, user?.id]);
  ```

### 3.3 Sécurisation des composants métier

- **Back-end NestJS 11** : les gardes JWT vérifient les tokens et injectent le payload dans chaque requête (`backend/src/auth-guard/jwt-auth.guard.ts:1-26`). L’`OwnershipGuard` recalcule le propriétaire réel de la ressource et autorise l’accès aux seuls auteurs ou administrateurs (`backend/src/auth-guard/ownership.guard.ts:1-49`), puis est spécialisé pour les challenges (`backend/src/challenge/challenge-ownership.guard.ts:1-11`).  
  ```ts
  // backend/src/auth-guard/ownership.guard.ts
  @Injectable()
  export class OwnershipGuard implements CanActivate {
    constructor(private readonly resourceService: any, private readonly authService: AuthentificationService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.headers['authorization']?.replace('Bearer ', '').trim();
      const decodedToken = this.authService.decodeToken(token);
      const resource = await this.resourceService.findOne(request.params.id);
      if (resource.user_id !== decodedToken.id && decodedToken.role !== 'ADMIN') {
        throw new ForbiddenException('Accès refusé : vous n’êtes pas le propriétaire');
      }
      return true;
    }
  }
  ```
- **Authentification (signup/login)**  
  ```ts
  // backend/src/authentification/authentification.service.ts (extrait)
  async signUp(data: CreateUserDto): Promise<any> {
    this.checkEmailFormat(data.email);
    this.checkPasswordFormat(data.password);
    const user = await this.usersService.create({ ...data });
    const apiUser = await this.usersService.findByEmail(data.email);
    const payload = { id: apiUser?.id, name: user.userName, email: user.email, role: user.role };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async signIn(data: SignInDto): Promise<any> {
    const user = await this.usersService.findByEmailWithPassword(data.email);
    if (!user) throw new NotFoundException();
    const isPasswordValid = await this.comparePasswords(data.password, user.password_hash);
    if (!isPasswordValid) throw new NotFoundException();
    const payload = { id: user.id, name: user.userName, role: user.role };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
  ```
- **Création de challenge**  
  ```ts
  // backend/src/challenge/challenge.controller.ts
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengeService.create({ ...createChallengeDto });
  }
  ```
  ```ts
  // backend/src/challenge/challenge.service.ts (extrait)
  async create(createChallengeDto: CreateChallengeDto) {
    const { user_id, image_url, ...rest } = createChallengeDto;
    const finalImageUrl =
      image_url?.trim() || `https://via.assets.so/game.webp?id=${Math.floor(Math.random() * 50) + 1}`;
    return await this.prisma.challenge.create({
      data: {
        ...rest,
        image_url: finalImageUrl,
        creator: { connect: { id: user_id } },
      },
    });
  }
  ```
- **Soumission de participation**  
  ```ts
  // backend/src/participation/participation.service.ts (extrait)
  async create(createParticipationDto: CreateParticipationDto) {
    const { user_id, challenge_id, ...rest } = createParticipationDto;
    if (!user_id) throw new BadRequestException('user_id est obligatoire');
    if (!challenge_id) throw new BadRequestException('challenge_id est obligatoire');
    return await this.prisma.participation.create({
      data: {
        ...rest,
        validated: rest.validated ?? false,
        challenge: { connect: { id: challenge_id } },
        user: { connect: { id: user_id } },
      },
    });
  }
  ```
- **Votes et prévention du spam**  
  ```ts
  // backend/src/vote/vote.service.ts (extrait)
  create(createVoteDto: CreateVoteDto) {
    const { user_id, target_id, target_type } = createVoteDto;
    if (!target_id) throw new Error('target_id est obligatoire');
    let targetData = {};
    if (target_type === TargetType.CHALLENGE) {
      targetData = { challenge: { connect: { id: target_id } } };
    } else if (target_type === TargetType.PARTICIPATION) {
      targetData = { participation: { connect: { id: target_id } } };
    } else {
      throw new Error('target_type invalide');
    }
    return this.prisma.vote.create({
      data: {
        target_type,
        ...targetData,
        user: { connect: { id: user_id } },
      },
    });
  }

  async hasVoted(checkVoteDto: CheckVoteDto): Promise<{ hasVoted: boolean; voteId?: string }> {
    const { user_id, target_id, target_type } = checkVoteDto;
    const result = await this.prisma.vote.findFirst({
      where: {
        user_id,
        ...(target_type === TargetType.CHALLENGE ? { challenge_id: target_id } : { participation_id: target_id }),
      },
    });
    return result ? { hasVoted: true, voteId: result.id } : { hasVoted: false };
  }
  ```

### 3.4 Tests et qualité

Le plan de tests couvre chaque use-case métier (création/lecture/suppression de votes, participations, challenges, parcours d’inscription/connexion). Il précise les entrées attendues, les statuts et les cas d’erreur, conformément aux bonnes pratiques ISTQB (`plan_test_backend.md:1-199`). Des scénarios rouges sont prévus pour vérifier la robustesse (ex. vote sans cible, participation sans challenge, email invalide). Prochaines étapes :

- **Tests d’intégration API** avec Jest + Supertest pour vérifier les statuts HTTP, le schéma des réponses et la gestion des erreurs.
- **Tests e2e Cypress** sur les parcours clés (inscription, connexion, création d’un challenge, vote). Le service `cypress` du docker-compose permet de les exécuter en local comme en CI (`docker-compose.yml:94-110`).

## 4. Bloc 2 – Concevoir et développer une application sécurisée organisée en couches

### 4.1 Analyse fonctionnelle et UX

Les besoins utilisateurs (reconnaissance des exploits, centralisation des défis, validation vidéo, classement) et les objectifs (interface intuitive, communauté bienveillante, visibilité des créateurs) sont explicités (`conception/cdc.md:11-65`). Les user stories ciblent neuf parcours majeurs (consultation libre, création de challenge, vote, participation) et cadrent le MVP (`conception/cdc.md:68-79`). Le sprint 0 a livré l’architecture logique, l’ERD, les diagrammes d’activité/séquence et les wireframes desktop/mobile (`carnet-de-board.md:14-32`), ce qui répond aux attendus « Analyser les besoins » et « Maquetter l’application ».

### 4.2 Architecture multicouche et organisation du code

- **Strate présentation** : Next.js (App Router) pilote le SSR, embarque les composants UI, l’état global d’authentification et des composants spécialisés (cartes, modales, vote).  
- **Strate métier** : NestJS isole chaque agrégat (user, challenge, participation, vote) avec ses DTOs et gardes. L’intercepteur `ExcludePassword` nettoie récursivement les réponses (`backend/src/interceptors/exclude-password.interceptor.ts:1-40`).  
- **Strate données** : Prisma décrit les entités, relations et enums `Difficulty`, `TargetType`, `Roles`, avec cascades et colonnes audit (`backend/prisma/schema.prisma:1-72`).  
  ```prisma
  // backend/prisma/schema.prisma (extrait)
  enum Difficulty {
    EASY
    MEDIUM
    HARD
  }

  model Challenge {
    id          String     @id @default(uuid())
    title       String
    difficulty  Difficulty
    creator     User       @relation("CreatedChallenges", fields: [user_id], references: [id], onDelete: Cascade)
    participations Participation[]
  }
  ```
- **Infra** : le docker-compose lance également Prisma Studio et un service Cypress pour industrialiser les e2e (`docker-compose.yml:44-110`). Cette stratification découpe clairement les responsabilités et respecte la compétence REAC « Définir l’architecture logicielle ».

### 4.3 Modèle de données et API

La continuité entre dictionnaire fonctionnel et schéma Prisma garantit la traçabilité (mêmes champs, contraintes, colonnes temporelles). Les contrôleurs exposent des endpoints RESTful (`challenge`, `participation`, `vote`, `auth`, `user`), sécurisés par JWT + guards, et rendent des DTOs tipés. Convention d’API :

- `POST /auth/signup` / `POST /auth/login` : génération de JWT.
- `GET /challenge`, `POST /challenge`, `PATCH /challenge/:id`, `DELETE /challenge/:id`.
- `POST /participation`, `GET /participation`, `DELETE /participation/:id`.
- `POST /vote`, `DELETE /vote/:id`, `POST /vote/check`.

Côté client, les types partagés et la sérialisation ISO évitent les conversions ad-hoc (`frontend/src/types/index.ts:1-68`). Les DTO Nest utilisent `class-validator` pour contraindre la forme des payloads (longueur, enum).

### 4.4 Fonctionnalités métiers transverses

- **Leaderboard** : calcul pondéré des scores (participations validées, votes obtenus, défis créés) pour valoriser plusieurs styles de contribution (`backend/src/user/user.service.ts:120-182`).  
- **Gestion des votes en temps réel** : la combinaison `VoteButton` + `/vote/check` offre une UX instantanée (icône remplie si vote existant) sans recharger la page (`frontend/src/app/components/button/voteButton.tsx:1-84`).  
- **Validation des vidéos** : les cartes intègrent l’embed YouTube sécurisé (`frontend/src/app/components/participationCard/participationCard.tsx:28-60`) et rappellent les règles du challenge via la page détail.  
- **Accessibilité / responsive** : usage systématique de Tailwind utilitaire et de grilles adaptatives (`frontend/src/app/components/challengeDetail/ParticipationsGrid.tsx:8-34`) répond aux contraintes RGAA mentionnées dans le CDC.

## 5. Bloc 3 – Préparer le déploiement d’une application sécurisée

### 5.1 Industrialisation & DevOps

- **Docker multi-services** : montée parallèle du front (port 5173), du back (port 3000), de PostgreSQL (5432), de Prisma Studio (5555) et d’un reverse proxy Caddy (80/443) pour préparer un déploiement en DMZ (`docker-compose.yml:1-85`).  
- **Automatisation Prisma** : le service backend enchaîne `prisma generate`, `migrate deploy`, `db push` et `db seed` avant `start:dev`, réduisant les erreurs humaines lors des livraisons (`docker-compose.yml:31-38`).  
- **Reverse proxy & HTTPS** : Caddy charge la configuration d’URL rewriting/HTTPS depuis `Caddyfile`, ce qui anticipe la montée en production (`docker-compose.yml:75-88`).  
- **Outils QA** : un service Cypress prêt à lancer les suites e2e démontre l’intention de tester en pipeline (`docker-compose.yml:94-110`). Les tests unitaires Nest via Jest sont prêts (`backend/package.json`, `scripts.test`), et le plan de tests formalise la couverture attendue (`plan_test_backend.md:1-199`).

### 5.2 Sécurité opérationnelle et RGPD

- **Gardes & rôles** : JWT + rôles `USER/ADMIN` au niveau du schéma et des guards forcent la séparation des privilèges (`backend/prisma/schema.prisma:17-39`, `backend/src/auth-guard/ownership.guard.ts:1-49`).  
- **Hashing & validation** : bcrypt et contrôles de pattern (email, mot de passe) sont exécutés côté serveur (`backend/src/authentification/authentification.service.ts:15-46`) avant d’écrire en base.  
- **Sanitisation des réponses** : suppression récursive de `password_hash` avant tout retour API (`backend/src/interceptors/exclude-password.interceptor.ts:10-40`).  
- **Gestion des erreurs métier** : chaque service renvoie des `BadRequestException` explicites lorsqu’une donnée ou relation manque, ce qui facilite l’observabilité (`backend/src/participation/participation.service.ts:10-85`, `backend/src/challenge/challenge.service.ts:11-85`).  
- **RGPD** : le CDC liste l’obligation de mentions légales/RGPD et d’un design accessible (`conception/cdc.md:60-64`). La feuille de route doit encore couvrir la portabilité et la suppression renforcée.

## 6. Difficultés rencontrées et réponses apportées

Les arbitrages de Sprint 0 montrent la volonté de limiter la dette : le passage à une architecture microservices a été challengé pour rester sur une base MVC modulaire gérée via NestJS/Prisma, tout en gardant l’option d’évolution (cf. objectifs du CDC). L’équipe a également travaillé à plusieurs sur Discord/LiveShare pour accélérer la convergence autour des maquettes et de la charte graphique (`carnet-de-board.md:3-32`). Le plan de tests recense explicitement les cas rouges (erreurs attendues) pour fiabiliser les développements ultérieurs (`plan_test_backend.md:16-189`).  
Autres points :

- **Migrations Prisma non reproductibles** : lorsqu’un collaborateur poussait une migration locale, le `prisma migrate deploy` échouait chez les autres (différences de plateforme). Décision : ne plus lancer les migrations côté host mais dans le conteneur backend (`docker-compose.yml:31-38`), ce qui garantit la même version de Prisma/Binary pour toute l’équipe.
- **Choix d’une base d’ingrédients interne** : face aux lacunes d’OpenFoodFacts pour les ingrédients bruts, l’équipe a constitué sa propre base à partir de sources fiables (Aprifel), améliorant la cohérence et l’autonomie.
- **Gestion du dépôt GitHub** : l’erreur “Repository not found” lors d’un `git push` a été diagnostiquée via `git ls-remote origin` et résolue en configurant l’accès SSH, démontrant une démarche de résolution structurée.
- **Grand nombre de branches distantes** : la lecture des refs (plus de 60) a conduit à renforcer la convention de nommage et à systématiser les revues pour éviter les collisions.
- **Synchronisation des assets front/back** : certains assets statiques (icônes, images) étaient modifiés sur plusieurs branches. Mise en place d’une règle : passage obligatoire par `public/assets` avec un fichier d’index documenté pour réduire les conflits Git.

## 7. Feuille de route et recommandations

1. **Validation continue & CI/CD** : brancher GitHub Actions ou GitLab CI sur le docker-compose existant pour lancer lint + tests + Cypress, puis pousser des images versionnées (prolongement naturel du Bloc 3).  
2. **RGPD avancé** : ajouter les endpoints de portabilité/suppression et tracer le consentement dans la base (extension du modèle `User`), conformément aux exigences du titre professionnel.  
3. **Monitoring et alerting** : intégrer un APM léger (Grafana/Loki) pour sécuriser la mise en production et répondre aux attendus de résilience.  
4. **Scalabilité fonctionnelle** : implémenter les évolutions « commentaires, filtres avancés, messagerie, récompenses » listées dans le CDC (`conception/cdc.md:81-120`) en s’appuyant sur la modularité actuelle (structures Prisma déjà prêtes pour de nouvelles relations).  
5. **Accessibilité & i18n** : finaliser les critères RGAA (navigation clavier, contrastes, attributs ARIA) et préparer une traduction en anglais, comme demandé dans le référentiel CDA.

---

**Alignement REAC**  
- Bloc 1 – Développer une application sécurisée : installation outillée, UI responsive, code défensif, plan de tests.  
- Bloc 2 – Concevoir et développer une application sécurisée organisée en couches : analyse des besoins, maquettes, architecture multicouche, ORM/documentation.  
- Bloc 3 – Préparer le déploiement d’une application sécurisée : conteneurisation, scripts de migration, proxy HTTPS, préparation des tests et des procédures de déploiement.
