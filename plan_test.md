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
- entrée : Aucun paramètre spécifique
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