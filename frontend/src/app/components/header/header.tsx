'use client';

import Button from '../button/button';
import Link from 'next/link';

const Header = () => {
  console.log("Coucou")
  return (
  
    <div className="bg-primary z-50" >
      <header className="flex justify-between items-center px-8 py-4">
        <div className="text-blanc text-xl font-bold">GamerChallenges</div>
        
        <nav className="flex space-x-6">
          <Link href="/" className="text-blanc hover:text-secondary">Accueil</Link>
          <Link href="/challenges" className="text-blanc hover:text-secondary">Challenges</Link>
          <Link href="/leaderboard" className="text-blanc hover:text-secondary">Leaderboard</Link>
          <Link href="/affronter" className="text-blanc hover:text-secondary">Affronter</Link>
        </nav>

        <div className="flex space-x-2">
            <Button label="Connexion" href="/auth/signin" variant="cta"/>
            <Button label="Inscription" href="/auth/signup" variant="white"/>
        </div>
      </header>
    </div>
  );
};

export default Header;
