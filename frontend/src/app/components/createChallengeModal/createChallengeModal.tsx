'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { apiFetch } from '@/lib/api'
import CreatableSelect from 'react-select/creatable';
import { fetchGames } from '@/lib/games';
import { containsProfanity } from '@/lib/moderation';

type Props = {
  label?: string
  className?: string
}

type GameOption = {
  label: string;
  value: {
    name: string;
    image: string;
  };
};

export default function CreateChallengeModal({ label = 'Créer un challenge', className = '' }: Props) {
  const { user, refreshProfile } = useAuth()
  const [submitError, setSubmitError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [games, setGames] = useState<GameOption[]>([]);
  const [game, setGame] = useState<GameOption | null>(null);
  const [difficulty, setDifficulty] = useState("EASY");
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchGames()
      .then((data) => {
        const options = data.results.map((game: any) => ({
          label: game.name,
          value: {
            name: game.name,
            image: game.background_image,
          },
        }));
        setGames(options);
      })
      .catch((err) => console.error('Error fetching games:', err));
  }, [])

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("")

    // Check for profanity
    const hasProfanity =
      containsProfanity(title) ||
      containsProfanity(description) ||
      containsProfanity(rules) ||
      (game ? containsProfanity(game.value.name) : false);

    if (hasProfanity) {
      setSubmitError("Oups ! Il semblerait que certains mots ne soient pas très 'fair-play'. Merci de rester courtois pour que le jeu reste amusant pour tous ! 🎮✨");
      return;
    }

    try {
      setLoading(true);
      const challenge = await apiFetch('/challenge', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          description: description,
          rules: rules,
          game: game?.value.name,
          image_url: game?.value.image || "/details/default_image.webp", // Default image for new games
          difficulty: difficulty,
          validated: false,
          user_id: user?.id,
        }),
      });

      if (challenge?.id) {
        await refreshProfile(); // Update user stats (points)
        setIsOpen(false);
        router.push(`/details/${challenge.id}`);
      } else {
        throw new Error("Réponse inattendue du serveur");
      }

    } catch (err: any) {
      setSubmitError(err.message || "Erreur lors de la soumission");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        disabled={!user}
        className={`
          px-4 py-2 rounded transition transform duration-200 ease-in-out 
          hover:-translate-y-0.5 hover:shadow-lg 
          p-[50px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
          ${user
            ? 'bg-cta text-noir hover:bg-cta/90'
            : 'bg-cta text-noir opacity-50 cursor-not-allowed'}
          ${className || ''}
        `}
      >
        {user ? label : 'Connexion requise'}
      </button>

      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>

              <h2 className="text-xl font-semibold mb-4 text-black  ">Créer un challenge</h2>

              {submitError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                  {submitError}
                </div>
              )}

              <div className="space-y-4">
                <input
                  name="title"
                  placeholder="Titre"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                />
                <textarea
                  name="rules"
                  placeholder="Règles"
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                />
                <CreatableSelect
                  options={games}
                  onChange={(newValue) => setGame(newValue as GameOption)}
                  onCreateOption={(inputValue) => {
                    const newOption = {
                      label: inputValue,
                      value: {
                        name: inputValue,
                        image: "" // No image for custom games
                      }
                    };
                    setGame(newOption);
                    setGames((prev) => [...prev, newOption]);
                  }}
                  value={game}
                  placeholder="Recherchez ou ajoutez un jeu"
                  isClearable
                  formatCreateLabel={(inputValue) => `Ajouter "${inputValue}"`}
                  className="text-black"
                />

                <select
                  name="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                >
                  <option value="EASY">Facile</option>
                  <option value="MEDIUM">Moyen</option>
                  <option value="HARD">Difficile</option>
                </select>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-[var(--cta)] text-[var(--noir)] py-2 rounded hover:bg-yellow-400  disabled:opacity-50"
                >
                  {loading ? 'Création...' : 'Créer'}
                </button>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root") as HTMLElement
        )}
    </div>
  )
}
