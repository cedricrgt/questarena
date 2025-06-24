'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import { apiFetch } from '@/lib/api'



type Props = {
  label?: string
  className?: string
}

export default function CreateChallengeModal({ label = 'Créer un challenge', className = '' }: Props) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    rules: '',
    game: '',
    difficulty: 'EASY',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const router = useRouter();

  const handleSubmit = async () => {
    console.log(user)
    if (!user?.id) {
      console.error('Utilisateur non connecté')
      return
    }

    setLoading(true)
    try {
      const response = await apiFetch('/challenge', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          validated: false,
          user_id: user.id,
        }),
      })
      if (response.ok) {
        router.push("/");
      } else {
        console.log(response)
        let errorMessage = 'Erreur inconnue';

        try {
          const contentType = response.headers.get('content-type');
          if (contentType?.includes('application/json')) {
            const errorJson = await response.json();
            errorMessage = errorJson.message || JSON.stringify(errorJson);
          } else {
            errorMessage = await response.text();
          }
        } catch (e) {
          errorMessage = 'Impossible de lire le corps de la réponse';
        }
  
        console.error(`Erreur HTTP ${response.status}: ${errorMessage}`);
        return;
      }
      setIsOpen(false)
    } catch (error) {
      console.error('Erreur lors de la création du challenge', error)
    } finally {
      setLoading(false)
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

              <div className="space-y-4">
                <input
                  name="title"
                  placeholder="Titre"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                />
                <textarea
                  name="rules"
                  placeholder="Règles"
                  value={form.rules}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                />
                <input
                  name="game"
                  placeholder="Jeu"
                  value={form.game}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                />
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
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
