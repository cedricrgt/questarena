"use client";

import { useState } from "react";
import Button from "../button/button";

interface ForgotPasswordModalProps {
  onClose: () => void;
}

export default function ForgotPasswordModal({ onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: data.message || "Demande envoyée avec succès" });
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.message || "Une erreur est survenue" });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur de connexion au serveur" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        className="max-w-md w-full bg-noir/95 backdrop-blur-md border border-primary/30 p-8 rounded-lg shadow-[0_0_30px_rgba(74,32,64,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-secondary mb-2 text-center font-primary uppercase tracking-wider drop-shadow-[0_0_5px_rgba(169,111,255,0.8)]">
          Mot de passe oublié
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          Entrez votre email pour demander une réinitialisation de mot de passe.
          Un administrateur traitera votre demande.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {message && (
            <div
              className={`p-3 rounded text-sm text-center ${
                message.type === "success"
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-red-500/20 text-red-300 border border-red-500/30"
              }`}
            >
              {message.text}
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">
              Adresse email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-primary/10 border border-primary/30 rounded px-4 py-3 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_rgba(169,111,255,0.3)] transition-all"
              placeholder="votre@email.com"
              required
            />
          </div>

          <Button
            label={isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
            type="submit"
            variant="cta"
            className="mt-2 w-full py-3"
            disabled={isSubmitting}
          />
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  );
}
