"use client";
import Button from "../button/button";

interface GuestRightSidebarProps {
    onLogin: () => void;
    onRegister: () => void;
}

export default function GuestRightSidebar({ onLogin, onRegister }: GuestRightSidebarProps) {
    return (
        <div className="h-full flex flex-col bg-noir/80 border-l border-primary/30 text-blanc backdrop-blur-sm shadow-[0_0_15px_rgba(74,32,64,0.5)] p-6 justify-center items-center">
            <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-secondary mb-2 font-primary">
                    Bienvenue
                </h3>
                <p className="text-sm text-gray-400">
                    Connecte-toi pour voir tes amis en ligne et participer aux défis.
                </p>
            </div>

            <Button
                label="Se connecter"
                onClick={onLogin}
                variant="cta"
                className="w-full py-3"
            />

            <div className="mt-6 text-center">
                <span className="text-xs text-gray-500">Pas encore de compte ?</span>
                <button
                    onClick={onRegister}
                    className="block w-full mt-2 text-xs text-secondary hover:text-white underline transition-colors"
                >
                    Créer un compte
                </button>
            </div>
        </div>
    );
}
