"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import Button from "../button/button";

interface ChangePasswordModalProps {
  userId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ChangePasswordModal({
  userId,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Validate password format
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError("Le mot de passe doit contenir au moins 8 caractères et un chiffre");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiFetch(`/user/${userId}/change-password`, {
        method: "PATCH",
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Try to extract error message from API response
        const errorMessage = err.message;
        if (errorMessage.includes("Mot de passe actuel incorrect")) {
          setError("Mot de passe actuel incorrect");
        } else {
          setError(errorMessage || "Erreur lors de la modification");
        }
      } else {
        setError("Erreur lors de la modification");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="max-w-md w-full bg-noir/95 backdrop-blur-md border border-primary/30 p-8 rounded-lg shadow-[0_0_30px_rgba(74,32,64,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-secondary mb-2 text-center font-primary uppercase tracking-wider drop-shadow-[0_0_5px_rgba(169,111,255,0.8)]">
          Modifier le mot de passe
        </h2>

        {success ? (
          <div className="text-center py-8">
            <div className="text-green-400 text-xl mb-2">✓</div>
            <p className="text-green-400">Mot de passe modifié avec succès !</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            {error && (
              <div className="p-3 rounded text-sm text-center bg-red-500/20 text-red-300 border border-red-500/30">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs text-gray-400 uppercase mb-1">
                Mot de passe actuel
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-primary/10 border border-primary/30 rounded px-4 py-3 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_rgba(169,111,255,0.3)] transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 uppercase mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-primary/10 border border-primary/30 rounded px-4 py-3 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_rgba(169,111,255,0.3)] transition-all"
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 8 caractères avec au moins un chiffre
              </p>
            </div>

            <div>
              <label className="block text-xs text-gray-400 uppercase mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-primary/10 border border-primary/30 rounded px-4 py-3 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_rgba(169,111,255,0.3)] transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                label={isSubmitting ? "Modification..." : "Modifier"}
                type="submit"
                variant="cta"
                className="flex-1 py-3"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
