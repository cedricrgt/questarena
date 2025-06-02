'use client';

const footer = () => {
    return (
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
    );
  };
  
  export default footer;
  