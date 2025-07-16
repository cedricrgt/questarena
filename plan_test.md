#### Plan de tests

## Vote
Cas de test : Créer un vote lié à un challenge
- test : Création d’un vote avec target_type CHALLENGE
- entrée : target_type = CHALLENGE, avec une participation existante et un utilisateur existant
- résultat : Prisma crée un vote lié au challenge avec les IDS données
- statut : VERT

Cas de test : Créer un vote lié à une participation
- test : Création d’un vote avec target_type PARTICIPATION
- entrée : target_type = PARTICIPATION, avec une participation existante et une utilisateur existant
- résultat : Prisma crée un vote lié à la participation
- statut : VERT


Cas de test : Créer un vote avec un type invalide
- test : Création d’un vote avec un type non supporté
- entrée : target_type = INVALIDE, avec un utilisateur existant et une cible existante
- résultat : La méthode lève une erreur « target_type invalide »
- statut : ROUGE


Cas de test : Création d'un vote sans cible
- test : Création d’un vote sans target_id
- entrée : type valide et utilisateur existant, cible du vote manquante
- résultat : La méthode lève une erreur « target_id est obligatoire »
- statut : ROUGE


Cas de test : Récupérer tous les votes
- test : Renvoyer la liste de tous les votes
- entrée : Un tableau de votes
- résultat : Retourne une liste de votes 
- statut : VERT


Cas de test : Récupérer un vote par son ID
- test : Trouver un vote via son ID
- entrée : L'id d'un vote existante
- résultat : Retourne le vote correspondant
- statut : VERT

Cas de test : Supprimer un vote
- test : Suppression d’un vote via son ID
- entrée : L'id d'un vote existante
- résultat : Prisma supprime le vote correspondant et retourne les données supprimées
- statut : VERT


Cas de test : Récupérer les votes pour un target donné
- test : Trouver tous les votes liés à un challenge ou une participation
- entrée : L'ID 
- résultat : Prisma retourne tous les votes associés au challenge_id ou participation_id
- statut : VERT


Cas de test : L’utilisateur a déjà voté pour une cible
- test : Vérifier l’existence d’un vote lié à une cible (Challenge ou Participation) pour un utilisateur
- entrée : un type valide, une cible existante et un utilisateur qui existe
- résultat : Retourne { hasVoted: true, voteId: id }
- statut : VERT

Cas de test : L’utilisateur n’a pas voté
- test : Vérifier l’absence de vote lié à une cible pour un utilisateur
- entrée : un type valide, une cible existante et un utilisateur qui existe
- résultat : Retourne { hasVoted: false, voteId: undefined }
- statut : VERT


## Participation 
Cas de test : Créer une participation valide
- test: Création d'une participation valide 
- entrée: Un utilisateur existant, un challenge existant, l'url d'une vidéo et une courte description 
- résultat : Prisma crée la participation et renvoie la participation crée dans sa réponse
- statut: VERT

Cas de test: Créer une participation sans utilisateur existant 
- test: On tente de créer une participation sans utilisateur
- entrée: Une user_id vide, le reste des données sont valides
- résultat : Une BadRequestException est levée
- statut : ROUGE


Cas de test: Créer une participation sans challenge existant
- test: On tente de créer une participation sans la lier à un challenge 
- entrée: Une challenge_id vide, le reste des données sont valides
- résultat : Une BadRequestException est levée
- statut : ROUGE


Cas de test : Récupérer toutes les participations
- test : L’utilisateur récupère la liste des participations
- entrée : Un tableau de participations 
- résultat : La liste des participations est renvoyée, avec created_at au format ISO
- statut : VERT


Cas de test : Récupérer une participation existante
- test : L’utilisateur récupère une participation par son id
- entrée : Une participation avec une id valide
- résultat : La participation est renvoyée 
- statut : VERT

Cas de test : Récupérer une participation inexistante
- test : L’utilisateur récupère une participation qui n'existe pas
- entrée : L'id d'une participation inexistante
- résultat : La méthode renvoie null
- statut : ROUGE

Cas de test : Mettre à jour une participation 
- test : L’utilisateur met à jour une participation existante 
- entrée : On modifie le statut de validation
- résultat : La participation est mise à jour et renvoyée avec ses nouvelles données
- statut : VERT


Cas de test : Supprimer une participation
- test : L’utilisateur supprime une participation existante
- entrée : L'ID de la participation
- résultat : La participation est supprimée 
- statut : VERT