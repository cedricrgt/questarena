import "../globals.css";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-primary">
      {/* Header with Logo and Navigation */}
      <header className="flex justify-between items-center px-8 py-4">
        <div className="text-blanc text-xl font-bold">GamerChallenges</div>
        <nav className="flex space-x-6">
          <a href="/" className="text-blanc hover:text-secondary">
            Accueil
          </a>
          <a href="/challenges" className="text-blanc hover:text-secondary">
            Challenges
          </a>
          <a href="/leaderboard" className="text-blanc hover:text-secondary">
            Leaderboard
          </a>
          <a href="/affronter" className="text-blanc hover:text-secondary">
            Affronter
          </a>
        </nav>
        <div className="flex space-x-2">
          <a href="/auth/signin">
            <button className="bg-cta text-noir px-4 py-2 rounded font-medium">
              Connexion
            </button>
          </a>
          <a href="/auth/signup">
            <button className="bg-white text-noir px-4 py-2 rounded font-medium">
              Inscription
            </button>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="bg-white flex-1 flex items-center justify-center ">
        <div className="w-full max-w-6xl mx-8 overflow-hidden flex">
          {/* Left Panel - Login Form */}
          <div className="w-1/2 bg-white p-8 border-2 border-r-0 border-primary rounded-l-lg">
            {children}
          </div>

          {/* Right Panel - Hero Content */}
          <div className="w-1/2 bg-secondary p-8 rounded-r-lg flex flex-col justify-center border-2 border-l-0 border-primary rounded-r-lg">
            <div className="text-blanc">
              <h1 className="text-3xl font-bold mb-4">LEVEL UP TON GAME !</h1>
              <p className="font-medium mb-8">
                AFFRONTE DES JOUEURS PASSIONNÉS SUR DES CHALLENGES ÉPIQUES ET DEVIENS LE MEILLEUR DU CLASSEMENT
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-cta rounded-full p-2 w-10 h-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="ml-4 font-bold">+ DE 50 000 JOUEURS</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-cta rounded-full p-2 w-10 h-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <span className="ml-4 font-bold">+ DE 1 000 DÉFIS</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-cta rounded-full p-2 w-10 h-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <span className="ml-4 font-bold">+ DE 200 JEUX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-primary-600 py-4 px-8">
        <div className="flex justify-between items-center">
          <div className="text-blanc font-bold">GamerChallenges</div>
          <div className="flex space-x-4">
            <a href="/mentions-legales" className="text-blanc hover:text-secondary text-sm">
              Mentions légales
            </a>
            <a href="/confidentialite" className="text-blanc hover:text-secondary text-sm">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}