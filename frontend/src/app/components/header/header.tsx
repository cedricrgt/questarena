"use client";

import Button from "../button/button";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
  
    <div className="bg-primary relative z-50" >
      <header className="flex justify-between items-center px-8 py-4">
        <h1 className="text-blanc text-2xl font-bold font-logo">
          GamerChallenges
        </h1>

        {/* Burger Menu Button */}
        <button
          className="md:hidden text-blanc z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-blanc hover:text-secondary">
            Accueil
          </Link>
          <Link href="/challenges" className="text-blanc hover:text-secondary">
            Challenges
          </Link>
          <Link href="/leaderboard" className="text-blanc hover:text-secondary">
            Leaderboard
          </Link>
          <Link href="/affronter" className="text-blanc hover:text-secondary">
            Affronter
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-2">
          <Button label="Connexion" href="/auth/signin" variant="cta" />
          <Button label="Inscription" href="/auth/signup" variant="white" />
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:hidden absolute top-full left-0 right-0 bg-primary flex-col items-center py-4 space-y-4 z-10 shadow-lg`}
        >
          <Link href="/" className="text-blanc hover:text-secondary">
            Accueil
          </Link>
          <Link href="/challenges" className="text-blanc hover:text-secondary">
            Challenges
          </Link>
          <Link href="/leaderboard" className="text-blanc hover:text-secondary">
            Leaderboard
          </Link>
          <Link href="/affronter" className="text-blanc hover:text-secondary">
            Affronter
          </Link>
          <div className="flex flex-col space-y-2">
            <Button label="Connexion" href="/auth/signin" variant="cta" />
            <Button label="Inscription" href="/auth/signup" variant="white" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
