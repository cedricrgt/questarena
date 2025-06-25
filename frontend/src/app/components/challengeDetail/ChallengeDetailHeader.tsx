import type { Challenge } from "@/types";

type ChallengeDetailHeaderProps = {
  challenge: Challenge | null;
};

const ChallengeDetailHeader = ({ challenge }: ChallengeDetailHeaderProps) => {
  const creatorName =
    typeof challenge?.creator === "object"
      ? challenge.creator.userName
      : challenge?.creator;

  return (
    <div className="mb-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 font-primary">
        {challenge?.game || "Titre du jeu inconnu"}
      </h2>
      <p>{challenge?.title || "Type de challenge inconnu"}</p>
      <p className="text-sm text-gray-600 font-secondary">
        Créé par {creatorName || "Inconnu"} •{" "}
        {challenge?.created_at
          ? new Date(challenge.created_at).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "date inconnue"}
      </p>
    </div>
  );
};

export default ChallengeDetailHeader;
