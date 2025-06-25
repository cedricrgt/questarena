import type { Challenge } from "@/types";
import { Heart, Users, Star } from "lucide-react";
import { VoteButton } from "../button/voteButton";

type ChallengeInfoBarProps = {
  challenge: Challenge | null;
  onVoteChange: () => void;
};

const ChallengeInfoBar = ({
  challenge,
  onVoteChange,
}: ChallengeInfoBarProps) => {
  // Supprimer l'état local, utiliser directement les données du challenge
  const votesCount = challenge?.votes?.length ?? 0;

  return (
    <div className="flex items-center justify-start gap-6 md:gap-8 text-sm mb-8 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-1">
        <Star size={16} className="text-yellow-500" />
        <p className="text-gray-600 font-secondary">
          {challenge?.difficulty || "Non précisée"}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Users size={16} className="text-secondary" />
        <p className="font-bold font-secondary">
          {challenge?.participations?.length ?? 0} participants
        </p>
      </div>
      <div className="flex items-center gap-1">
        {challenge?.id && (
          <VoteButton
            targetId={challenge.id}
            targetType="CHALLENGE"
            onVoteChange={onVoteChange}
          />
        )}
        <p className="font-bold font-secondary">{votesCount} likes</p>
      </div>
    </div>
  );
};

export default ChallengeInfoBar;
