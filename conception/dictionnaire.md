# Dictionnaire des données - MVP

## Utilisateur

| Champ           | Type      | Spécificité                           | Description                              |
| --------------- | --------- | ------------------------------------- | ---------------------------------------- |
| `id`            | UUID      | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | Identifiant unique de l’utilisateur (PK) |
| `username`      | VARCHAR   | NOT NULL                              | Nom d'utilisateur, unique                |
| `email`         | VARCHAR   | NOT NULL                              | Adresse e-mail, unique                   |
| `password_hash` | VARCHAR   | NOT NULL                              | Mot de passe haché                       |
| `avatar_url`    | TEXT      | NOT NULL                              | URL de l’avatar de profil                |
| `created_at`    | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP   | Date de création du compte               |

## Challenge

| Champ         | Type      | Spécificité                           | Description                                         |
| ------------- | --------- | ------------------------------------- | --------------------------------------------------- |
| `id`          | UUID      | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | Identifiant unique du challenge (PK)                |
| `title`       | VARCHAR   | NOT NULL                              | Titre du challenge                                  |
| `description` | TEXT      | NOT NULL                              | Description du challenge                            |
| `rules`       | TEXT      | NOT NULL                              | Règles spécifiques du challenge                     |
| `game`        | VARCHAR   | NOT NULL                              | Jeu concerné par le challenge                       |
| `difficulty`  | VARCHAR   | NOT NULL                              | Difficulté (optionnelle – `easy`, `medium`, `hard`) |
| `created_by`  | UUID      | FOREIGN KEY,NOT NULL                  | Référence à l’utilisateur créateur (`users.id`)     |
| `validated`   | BOOLEAN   | NOT NULL                              | Statut de validation du challenge                   |
| `created_at`  | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP   | Date de création du challenge                       |

## Participation

| Champ         | Type      | Spécificité                           | Description                                           |
| ------------- | --------- | ------------------------------------- | ----------------------------------------------------- |
| `id`          | UUID      | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | Identifiant unique de la participation (PK)           |
| `users_id`    | UUID      | FOREIGN KEY, NOT NULL                 | Référence à l’auteur de la participation (`users.id`) |
| `video_url`   | TEXT      | NOT NULL                              | URL de la vidéo prouvant la réalisation               |
| `description` | TEXT      | NOT NULL                              | Description facultative de la vidéo                   |
| `validated`   | BOOLEAN   | NOT NULL                              | Validation de la participation                        |
| `created_at`  | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP   | Date de création de la participation                  |

## Vote

| Champ        | Type      | Spécificité                           | Description                                                                        |
| ------------ | --------- | ------------------------------------- | ---------------------------------------------------------------------------------- |
| `id`         | UUID      | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | Identifiant unique du vote (PK)                                                    |
| `users_id`   | UUID      | FOREIGN KEY, NOT NULL                 | Référence à l’auteur du vote (`users.id`)                                          |
| `$target_id` | UUID      | FOREIGN KEY, NOT NULL                 | Référence au challenge ou à la participation (`challenge.id` / `participation.id`) |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP   | Date de création de la participation                                               |
