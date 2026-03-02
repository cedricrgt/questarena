import { useAuth } from "@/lib/auth-context";
import React, { useState } from "react";
import { apiFetch } from "@/lib/api";
import ParticipationForm from "./ParticipationForm";


type ParticipationBoxProps = {
  challengeId: string;
};

const ParticipationBox = ({ challengeId }: ParticipationBoxProps) => {
  const { isLoggedIn, user } = useAuth();
  const [submitError, setSubmitError] = useState("");

  const handleParticipationSubmit = async (
    videoUrl: string,
    description: string
  ): Promise<boolean> => {
    setSubmitError("");
    try {
      await apiFetch("/participation", {
        method: "POST",
        body: JSON.stringify({
          challenge_id: challengeId,
          video_url: videoUrl,
          description: description,
          validated: false,
          user_id: user?.id,
        }),
      });
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erreur lors de la soumission";
      setSubmitError(errorMessage);
      return false;
    }
  };



  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-6 font-primary">
        Participez au Challenge
      </h3>
      {isLoggedIn ? (
        <ParticipationForm
          onSubmit={handleParticipationSubmit}
          submitError={submitError}
        />
      ) : (
        <div className="text-center p-4 bg-primary/10 rounded border border-primary/30">
          <p className="text-sm text-gray-300 mb-2">Connectez-vous pour participer</p>
        </div>
      )}
    </div>
  );
};

export default ParticipationBox;
