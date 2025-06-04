"use client";

import { useState } from "react";
import { Menu, Heart, Users, Trophy, Star } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ChallengeDetailPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn, login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

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

  const handleParticipationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Participation form submitted (static)");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="relative px-4 py-4 md:px-8 md:py-6">
        <div className="relative w-full h-[40vh] md:h-[50vh] rounded-3xl overflow-hidden">
          <img
            src="/details/hero-details.webp"
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold font-primary">
            En cours
          </div>
          <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-75 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-primary">
            <Users size={12} /> 227 participants
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
              Tu es la lumière dans l'ombre, le seul à avoir compris comment
              gagner… mais comme toujours, ta team est en bronze émotionnel. Ce
              défi récompense ta capacité à rester dans le déni tout en
              enchaînant les défaites, persuadé que tu n'y est pour rien.
            </p>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md">
              <span className="text-xl mt-1">🎯</span>
              <p className="text-gray-800 leading-relaxed font-secondary">
                Perdre 10 parties classées ou normales d'affilée, en écrivant au
                moins une fois "diff" dans chaque partie.
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-secondary focus:border-secondary font-secondary"
                    placeholder="Ajoutez une description à votre participation"
                  ></textarea>
                </div>

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
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative h-32 rounded-lg mb-4 overflow-hidden flex items-center justify-center bg-gray-300">
                <img
                  src="/assets/participation-placeholder-1.webp"
                  alt="Participation video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 w-10 h-10 bg-white bg-opacity-50 rounded-full flex items-center justify-center text-lg text-gray-800">
                  ▶️
                </div>
                <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded-full flex items-center gap-1 font-secondary">
                  <Heart size={12} className="inline mr-1 text-red-500" /> 1.800
                  likes
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-2 text-sm font-secondary">
                Tootsie roll sugar plum toffee bear claw topping. Caramels
                cupcake ice cream brownie chocolate. Candy candy canes chocolate
                cake tootsie roll fruitcake. Apple pie marzipan wafer candy
                dragée powder croissant oat cake.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative h-32 rounded-lg mb-4 overflow-hidden flex items-center justify-center bg-gray-300">
                <img
                  src="/assets/participation-placeholder-2.webp"
                  alt="Participation video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 w-10 h-10 bg-white bg-opacity-50 rounded-full flex items-center justify-center text-lg text-gray-800">
                  ▶️
                </div>
                <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded-full flex items-center gap-1 font-secondary">
                  <Heart size={12} className="inline mr-1 text-red-500" /> 0
                  likes
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-2 text-sm font-secondary">
                Tootsie roll sugar plum toffee bear claw topping. Caramels
                cupcake ice cream brownie chocolate. Candy candy canes chocolate
                cake tootsie roll fruitcake. Apple pie marzipan wafer candy
                dragée powder croissant oat cake.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative h-32 rounded-lg mb-4 overflow-hidden flex items-center justify-center bg-gray-300">
                <img
                  src="/assets/participation-placeholder-1.webp"
                  alt="Participation video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 w-10 h-10 bg-white bg-opacity-50 rounded-full flex items-center justify-center text-lg text-gray-800">
                  ▶️
                </div>
                <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded-full flex items-center gap-1 font-secondary">
                  <Heart size={12} className="inline mr-1 text-red-500" /> 0
                  likes
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-2 text-sm font-secondary">
                Tilt Simulator 2025
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative h-32 rounded-lg mb-4 overflow-hidden flex items-center justify-center bg-gray-300">
                <img
                  src="/assets/participation-placeholder-2.webp"
                  alt="Participation video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 w-10 h-10 bg-white bg-opacity-50 rounded-full flex items-center justify-center text-lg text-gray-800">
                  ▶️
                </div>
                <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded-full flex items-center gap-1 font-secondary">
                  <Heart size={12} className="inline mr-1 text-red-500" /> 0
                  likes
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-2 text-sm font-secondary">
                Tilt Simulator 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
