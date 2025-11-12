'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { apiFetch } from '@/lib/api'
import Select from 'react-select'
import { fetchGames } from '@/lib/games';


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
  const { user } = useAuth()
  const [submitError, setSubmitError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [games, setGames] = useState<GameOption[]>([]);
  const [game, setGame] = useState<GameOption | null>(null);
  const [difficulty, setDifficulty] = useState("EASY");
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    rules: '',
    game: '',
    difficulty: 'EASY',
  })
  const [loading, setLoading] = useState(false)
  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      width: '100%',
      border: `1px solid var(--secondary)`,
      borderRadius: '0.5rem',
      boxShadow: '0 0 0 2px var(--secondary), 0 0 5px rgba(0,0,0,0.25)',
      outline: 'none',
      padding: '2px 6px',
      backgroundColor: 'transparent',
      fontWeight: '700',
      color: 'var(--tertiary)',
      '&:hover': {
        borderColor: 'var(--secondary)',
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: 'var(--tertiary)',
      fontWeight: 700,
    }),
    input: (base: any) => ({
      ...base,
      color: 'var(--tertiary)',
      fontWeight: 700,
    }),
    placeholder: (base: any) => ({
      ...base,
      color: 'rgba(148,163,184,0.9)',
      fontWeight: 600,
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      zIndex: 50,
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px rgba(0,0,0,0.25)',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? '#1e293b' : '#0f172a',
      color: '#f8fafc',
      fontWeight: 600,
      ':active': {
        backgroundColor: '#1e293b',
      },
    }),
  }

  useEffect(()=>{
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
  },[])


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("")
    try {
      const challenge = await apiFetch('/challenge', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          description: description,
          rules: rules,
          game:  game?.value.name,
          image_url: game?.value.image,
          difficulty: difficulty,
          validated: false,
          user_id: user?.id,
        }),
      });

      if (challenge?.id) {
        router.push(`/details/${challenge.id}`);
      } else {
        throw new Error("Réponse inattendue du serveur");
      }

    } catch (err: any) {
      setSubmitError(err.message || "Erreur lors de la soumission");
    }
  }

  return (
    <div className="relative text-tertiary">
      <button
        onClick={() => setIsOpen(true)}
        disabled={!user}
        className={`
          px-4 py-2 rounded transition transform duration-200 ease-in-out 
          hover:-translate-y-0.5 hover:shadow-lg 
          p-[50px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
          ${user
            ? 'bg-cta text-primary hover:bg-cta/90'
            : 'bg-cta text-primary opacity-50 cursor-not-allowed'}
          ${className || ''}
        `}
      >
        {user ? label : 'Connexion requise'}
      </button>

      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/75">
            <div className="bg-secondary/25 backdrop-blur-sm rounded-lg shadow-xl w-full max-w-lg p-6 relative">
              <button
                className="absolute top-2 right-2 hover:text-tertiary text-2xl text-bold hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>

              <h2 className="text-xl text-shadow-sm text-shadow-secondary font-bold mb-2 font-primary">Créer un challenge</h2>

              <div className="space-y-4  text-white">
                <input
                  name="title"
                  placeholder="Titre"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-secondary  rounded shadow-[0px_0px_5px_rgba(0,0,0,0.25)] ring-2 ring-secondary shadow-secondary px-3 py-2 text-tertiary font-bold"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-secondary  rounded shadow-[0px_0px_15px_rgba(0,0,0,0.50)] ring-2 ring-secondary shadow-secondary px-3 py-2 text-tertiary"
                />
                <textarea
                  name="rules"
                  placeholder="Règles"
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  className="w-full border border-secondary rounded shadow-[0px_0px_15px_rgba(0,0,0,0.50)] ring-2 ring-secondary shadow-secondary px-3 py-2 text-tertiary"
                />
                <Select
                  options={games}
                  onChange={setGame}
                  value={game}
                  placeholder="Recherchez un jeu"
                  isClearable
                  styles={selectStyles}
                />
               
                <select
                  name="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full border border-secondary  rounded shadow-[0px_0px_15px_rgba(0,0,0,0.50)] ring-2 ring-secondary shadow-secondary px-3 py-2 text-tertiary"
                >
                  <option value="EASY">Facile</option>
                  <option value="MEDIUM">Moyen</option>
                  <option value="HARD">Difficile</option>
                </select>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className=" px-4 py-2 transition transform duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg p-[50px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-cta text-primary hover:bg-cta/90 rounded-2xl w-full"
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
