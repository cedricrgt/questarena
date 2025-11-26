"use client";

import { useState } from "react";
import Button from "../button/button";
import { useAuth } from "@/lib/auth-context";

interface LoginFormProps {
    onLoginSuccess: () => void;
    onSwitchToRegister: () => void;
}

export default function LoginForm({ onLoginSuccess, onSwitchToRegister }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await login({ email, password });
            onLoginSuccess();
        } catch (err: any) {
            setError(err.message || "Erreur de connexion");
        }
    };

    return (
        <div className="max-w-md mx-auto w-full bg-noir/80 backdrop-blur-md border border-primary/30 p-8 rounded-lg shadow-[0_0_20px_rgba(74,32,64,0.6)]">
            <h2 className="text-2xl font-bold text-secondary mb-6 text-center font-primary uppercase tracking-wider drop-shadow-[0_0_5px_rgba(169,111,255,0.8)]">
                Connexion
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <div>
                    <label className="block text-xs text-gray-400 uppercase mb-1">Email ou Pseudo</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-primary/10 border border-primary/30 rounded px-4 py-2 text-white focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_rgba(169,111,255,0.3)] transition-all"
                        placeholder="email ou pseudo"
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
                    label="Se connecter"
                    type="submit"
                    variant="cta"
                    className="mt-4 w-full py-3"
                />
            </form>

            <div className="mt-6 text-center">
                <span className="text-sm text-gray-500">Pas encore de compte ? </span>
                <button
                    onClick={onSwitchToRegister}
                    className="text-sm text-secondary hover:text-white underline transition-colors"
                >
                    Créer un compte
                </button>
            </div>
        </div>
    );
}
