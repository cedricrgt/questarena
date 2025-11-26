"use client";

import Link from "next/link";

const footer = () => {
  return (
    <footer className="mt-auto border-t border-secondary/50 py-4 px-8  pb-20 sm:pb-0 z-10 bg-primary/50 relative">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <h1 className="text-blanc text-2xl font-bold font-logo">
          GamerChallenges
        </h1>
        
        <div className="flex gap-6 text-sm">
          <Link 
            href="/mentions-legales" 
            className="text-gray-300 hover:text-secondary transition-colors"
          >
            Mentions légales
          </Link>
          <Link 
            href="/confidentialite" 
            className="text-gray-300 hover:text-secondary transition-colors"
          >
            Politique de confidentialité
          </Link>
        </div>

        <p className="text-blanc text-sm">
          © {new Date().getFullYear()} GamerChallenges. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default footer;
