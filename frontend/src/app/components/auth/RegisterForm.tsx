"use client";

import { useState } from "react";
import Button from "../button/button";
import { useAuth } from "@/lib/auth-context";

interface RegisterFormProps {
    onRegisterSuccess: () => void;
    onSwitchToLogin: () => void;
}

export default function RegisterForm({ onRegisterSuccess, onSwitchToLogin }: RegisterFormProps) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useAuth();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signup({ userName: username, email, password });
            onRegisterSuccess();
        } catch (err: any) {
            setError(err.message || "Erreur d'inscription");
        }
    };

    return (
        <div className="max-w-md mx-auto w-full bg-noir/80 backdrop-blur-md border border-primary/30 p-8 rounded-lg shadow-[0_0_20px_rgba(74,32,64,0.6)]">
            <h2 className="text-2xl font-bold text-secondary mb-6 text-center font-primary uppercase tracking-wider drop-shadow-[0_0_5px_rgba(169,111,255,0.8)]">
                Inscription
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <div>
                    <label className="block text-xs text-gray-400 uppercase mb-1">Pseudo</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-primary/10 border border-primary/30 rounded px-4 py-2 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_rgba(169,111,255,0.3)] transition-all"
                        placeholder="GamerPro123"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-400 uppercase mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-primary/10 border border-primary/30 rounded px-4 py-2 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_rgba(169,111,255,0.3)] transition-all"
                        placeholder="exemple@email.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-400 uppercase mb-1">Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-primary/10 border border-primary/30 rounded px-4 py-2 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_rgba(169,111,255,0.3)] transition-all"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <Button
                    label="S'inscrire"
                    type="submit"
                    variant="cta"
                    className="mt-4 w-full py-3"
                />
            </form>

            <div className="mt-6 text-center">
                <span className="text-sm text-gray-500">Déjà un compte ? </span>
                <button
                    onClick={onSwitchToLogin}
                    className="text-sm text-secondary hover:text-white underline transition-colors"
                >
                    Se connecter
                </button>
            </div>
        </div>
    );
}
