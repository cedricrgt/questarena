"use client";

import { useEffect, useState } from "react";
import { Menu, Heart, Users, Trophy, Star } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { Challenge } from "@/types";
import ParticipationCard from "@/app/components/participationCard/participationCard";

export default function ChallengeDetailPage() {
  const params = useParams();
  const challengeId = params.id as string;
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [image, setImage] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const { isLoggedIn, login, user } = useAuth();
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!challengeId) return;
    apiFetch(`/challenge/${challengeId}`)
      .then(setChallenge)
      .catch((err) => {
        console.error("Erreur lors du chargement du challenge :", err);
      });
  }, [challengeId]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      await login({ email: emailOrUsername, password });
      console.log("Logged in successfully!");
    } catch (err: any) {
      console.error("Login failed:", err);
      setLoginError(
        err.message || "Login failed. Please check your credentials."
      );
    }
  };

  const handleParticipationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setVideoUrl("");
      setDescription("");
    } catch (err: any) {
      setSubmitError(err.message || "Erreur lors de la soumission");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="relative px-4 py-4 md:px-8 md:py-6">
        <div className="relative w-full h-[40vh] md:h-[50vh] rounded-3xl overflow-hidden">
          <img
            src={challenge?.image_url || "/details/default_image.webp"}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-fit rounded-3xl"
          />
          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold font-primary">
            En cours
          </div>
          <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-75 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-primary">
            <Users size={12} /> {challenge?.participations?.length ?? 0} {""}
            participants
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-1">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 font-primary">
              C'est la Team, Pas Moi.
            </h2>
            <p className="text-sm text-gray-600 font-secondary">
              Créé par GamerPro23 • 23 avril 2025
            </p>
          </div>

          <div className="flex items-center justify-start gap-6 md:gap-8 text-sm mb-8 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500" />
              <span className="text-gray-600 font-secondary">Difficulté</span>
              <span className="font-bold font-secondary">Facile</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} className="text-secondary" />
              <span className="text-gray-600 font-secondary">Participants</span>
              <span className="font-bold font-secondary">247 contribs</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={16} className="text-secondary" />
              <span className="text-gray-600 font-secondary">Votes</span>
              <span className="font-bold font-secondary">1.800 likes</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold font-primary">
              🔴 FIN LE 25 AVRIL 2025
            </span>
            <span className="bg-secondary text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold font-primary">
              🎮 Tilt Simulator 2025
            </span>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 font-primary">
              Description & Règles
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 font-secondary">
              {challenge?.description ||
                "Description du challenge absente, merci de contacter l'administrateur."}
            </p>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md">
              <span className="text-xl mt-1">🎯</span>
              <p className="text-gray-800 leading-relaxed font-secondary">
                {challenge?.rules ||
                  "Règles absentes, merci de contacter l'administrateur "}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 font-primary">
              Participez au Challenge
            </h3>

            {isLoggedIn ? (
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="mb-4">
                  <label
                    htmlFor="video-url"
                    className="block text-sm font-medium text-gray-700 mb-1 font-secondary"
                  >
                    Lien de votre vidéo (YouTube, Twitch, etc.)
                  </label>
                  <input
                    type="url"
                    id="video-url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary font-secondary"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="participation-description"
                    className="block text-sm font-medium text-gray-700 mb-1 font-secondary"
                  >
                    Description de votre participation
                  </label>
                  <textarea
                    id="participation-description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary font-secondary"
                    placeholder="Ajoutez une description à votre participation"
                  ></textarea>
                </div>

                {submitError && <p className="text-red-500">{submitError}</p>}

                <button
                  onClick={handleParticipationSubmit}
                  className="w-full mt-6 py-3 rounded-full text-primary font-bold text-lg tracking-wide bg-cta hover:bg-cta/75 transition-colors font-primary"
                >
                  PARTICIPER
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-bold mb-4 text-center font-primary">
                  Connectez-vous à votre compte
                </h4>
                {loginError && (
                  <p className="text-red-500 text-sm text-center mb-4">
                    {loginError}
                  </p>
                )}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1 font-secondary"
                    >
                      Email ou nom d'utilisateur
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary font-secondary"
                      placeholder="Votre email ou nom"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1 font-secondary"
                    >
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary font-secondary"
                      placeholder="Votre mot de passe"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-primary font-bold text-lg tracking-wide bg-cta hover:bg-yellow-600 transition-colors font-primary"
                  >
                    CONNEXION
                  </button>
                </form>
                <p className="text-center text-sm mt-4 text-gray-700 font-secondary">
                  Pas encore de compte ?
                  <Link
                    href="/auth/signup"
                    className="text-secondary hover:underline font-semibold"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <h3 className="text-xl font-bold mb-6 font-primary">
            Participations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenge?.participations &&
            challenge.participations.length > 0 ? (
              challenge.participations.map((participation) => (
                <ParticipationCard
                  key={participation.id}
                  link={participation.video_url}
                  title={participation.description}
                  nbVotes={participation.nb_votes}
                  challenge={null}
                  userId={participation.user_id}
                />
              ))
            ) : (
              <p>Aucune participation pour ce challenge.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
