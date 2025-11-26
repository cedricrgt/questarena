import type { Challenge } from "@/types";

const getEndDate = (startDate: string | undefined): string => {
  if (!startDate) return "Date de fin non disponible";
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + 1); // Ajoute 1 mois
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

type ChallengeTagsProps = {
  challenge: Challenge | null;
};

const ChallengeTags = ({ challenge }: ChallengeTagsProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8 p-4">
      <p className="bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold font-primary">
        🔴 FIN LE {getEndDate(challenge?.createdat)}
      </p>
      <p className="bg-secondary text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold font-primary">
        🎮 {challenge?.game || "Jeu non spécifié"}
      </p>
    </div>
  );
};

export default ChallengeTags;
