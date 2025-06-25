import type { Challenge } from "@/types";
import { Heart, Users, Star } from "lucide-react";

type ChallengeInfoBarProps = {
  challenge: Challenge | null;
  votesCount: number;
  hasVoted: boolean;
  onVote: () => void;
};

const ChallengeInfoBar = ({
  challenge,
  votesCount,
  hasVoted,
  onVote,
}: ChallengeInfoBarProps) => {
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
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={onVote}
        title={hasVoted ? "Vous avez déjà voté" : "Voter"}
      >
        <Heart
          size={16}
          className={hasVoted ? "text-red-500" : "text-secondary"}
        />
        <p className="font-bold font-secondary">{votesCount} likes</p>
      </div>
    </div>
  );
};

export default ChallengeInfoBar;
