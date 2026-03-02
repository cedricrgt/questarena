import type { Challenge } from "@/types";

type ChallengeDetailHeaderProps = {
  challenge: Challenge | null;
};

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Trash2, Edit } from "lucide-react";
import { apiFetch } from "@/lib/api";

const ChallengeDetailHeader = ({ challenge }: ChallengeDetailHeaderProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const creatorName =
    typeof challenge?.creator === "object"
      ? challenge.creator.userName
      : challenge?.creator;


  const isOwner = user?.id === challenge?.user_id;
  const isAdmin = user?.role === "ADMIN";
  const canEdit = isOwner || isAdmin;

  const handleDelete = async () => {
    if (!challenge?.id) return;
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce challenge ?")) return;

    try {
      await apiFetch(`/challenge/${challenge.id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to delete challenge", error);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="mb-6 flex justify-between items-start">
      <div>
        <h2 className="text-3xl md:text-4xl text-shadow-sm text-shadow-secondary font-bold mb-2 font-primary">
          {challenge?.game || "Titre du jeu inconnu"}
        </h2>
        <p className="dark:text-white">
          {challenge?.title || "Type de challenge inconnu"}
        </p>
        <p className="text-sm dark:text-white font-secondary">
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

      {canEdit && (
        <div className="flex gap-2">
          <button
            onClick={() => alert("Fonctionnalité d'édition à venir")}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            title="Modifier"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            title="Supprimer"
          >
            <Trash2 size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetailHeader;
