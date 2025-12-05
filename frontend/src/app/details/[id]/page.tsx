"use client";

import { useEffect, useState } from "react";
import { Users, CheckCircle, Info } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { Challenge } from "@/types";
import ChallengeDetailHeader from "@/app/components/challengeDetail/ChallengeDetailHeader";
import ChallengeInfoBar from "@/app/components/challengeDetail/ChallengeInfoBar";
import ParticipationsGrid from "@/app/components/challengeDetail/ParticipationsGrid";
import ParticipationForm from "@/app/components/challengeDetail/ParticipationForm";
import { useNavigation } from "@/lib/navigation-context";

import BackButton from "@/app/components/backButton/backButton";



export default function ChallengeDetailPage() {
  const params = useParams();
  const challengeId = params.id as string;
  const [submitError, setSubmitError] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const [isParticipationSubmitted, setIsParticipationSubmitted] =
    useState(false);
  const [hasUserParticipated, setHasUserParticipated] = useState(false);

  const { isLoggedIn, user, refreshProfile } = useAuth();
  const { setViewState } = useNavigation();

  const fetchChallenge = () => {
    if (!challengeId) return;
    apiFetch(`/challenge/${challengeId}`)
      .then((data) => {
        setChallenge(data);
        if (user && data.participations) {
          const userHasParticipated = data.participations.some(
            (p: { user_id: string }) => p.user_id === user.id
          );
          setHasUserParticipated(userHasParticipated);
        } else {
          setHasUserParticipated(false);
        }
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du challenge :", err);
      });
  };

  useEffect(() => {
    fetchChallenge();
  }, [challengeId, user, hasUserParticipated, challenge]);



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

      fetchChallenge();
      await refreshProfile(); // Update user stats (points)
      setIsParticipationSubmitted(true);
      return true;
    } catch (err: unknown) {
      console.error("Erreur lors de la soumission de la participation:", err);
      const errorMessage = err instanceof Error ? err.message : "Erreur lors de la soumission";
      setSubmitError(errorMessage);
      return false;
    }
  };
  return (
    <div className="min-h-screen bg-black dark:text-white">
      <section className="relative px-4 py-4 md:px-8 md:py-6 flex flex-col gap-4">
        <div className="self-start z-20">
          <BackButton />
        </div>
        <div className="flex justify-center items-center relative w-full h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden bg-radial-[at_50%_50%] from-secondary via-primary to-black shadow-[inset_0_0_400px_rgba(0,0,0,1)]">
          <img
            src={challenge?.image_url || "/details/default_image.webp"}
            alt="Hero background"
            className="w-auto h-[90%] object-fit mx-auto rounded-3xl shadow-[0px_0px_15px_rgba(0,0,0,0.50)] ring-2 ring-secondary shadow-secondary"
          />
          <div className="absolute top-4 left-4 bg-secondary shadow-[0px_0px_15px_rgba(0,0,0,0.1)] ring-2 ring-primary shadow-secondary text-white text-xs px-3 py-1 rounded-full font-semibold font-primary">
            En cours
          </div>
          <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-75 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-primary">
            <Users size={12} /> {challenge?.participations?.length ?? 0} {""}
            participations
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-1">
          <ChallengeDetailHeader challenge={challenge} />

          <ChallengeInfoBar
            challenge={challenge}
            onVoteChange={fetchChallenge}
          />

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 font-primary">
              Participez au Challenge
            </h3>
            {isParticipationSubmitted ? (
              <div
                className="bg-secondary border-l-4 border-primary text-primary p-4 rounded-lg shadow-md flex items-center gap-4"
                role="alert"
              >
                <CheckCircle size={24} className="text-primary" />
                <div>
                  <p className="font-bold text-primari">
                    Participation enregistrée !
                  </p>
                  <p>Votre participation a bien été soumise.</p>
                </div>
              </div>
            ) : hasUserParticipated ? (
              <div
                className="bg-secondary border-l-4 border-primary text-primary p-4 rounded-lg shadow-md flex items-center gap-4"
                role="alert"
              >
                <Info size={24} className="text-primary" />
                <div>
                  <p className="font-bold text-primari">
                    Vous avez déjà participé à ce challenge.
                  </p>
                </div>
              </div>
            ) : isLoggedIn ? (
              <ParticipationForm
                onSubmit={handleParticipationSubmit}
                submitError={submitError}
              />
            ) : (
              <div className="bg-secondary rounded-lg p-6 shadow-md text-center">
                <h4 className="text-lg font-bold mb-4 font-primary">
                  Connectez-vous pour participer
                </h4>
                <p className="text-gray-600 mb-4 font-secondary">
                  Vous devez être connecté pour soumettre une participation à ce challenge.
                </p>
                <button
                  onClick={() => setViewState("login")}
                  className="w-full py-3 rounded-full text-primary font-bold text-lg tracking-wide bg-cta hover:bg-yellow-600 transition-colors font-primary"
                >
                  SE CONNECTER
                </button>
                <p className="text-center text-sm mt-4 text-gray-700 font-secondary">
                  Pas encore de compte ?{" "}
                  <button
                    onClick={() => setViewState("register")}
                    className="text-secondary hover:underline font-semibold"
                  >
                    Créer un compte
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <ParticipationsGrid challenge={challenge} />
        </div>
      </div>
    </div>
  );
}
