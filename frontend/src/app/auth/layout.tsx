import "../globals.css";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-primary">
      {/* Main Content */}
      <div className="bg-white flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto overflow-hidden flex flex-col lg:flex-row bg-transparent rounded-lg">
          {/* Left Panel - Login Form */}
          <div className="w-full lg:w-1/2 bg-white p-6 sm:p-8 border-2 border-primary rounded-lg lg:rounded-r-none lg:rounded-l-lg">
            {children}
          </div>

          {/* Right Panel - Hero Content */}
          <div className="hidden lg:flex w-1/2 bg-secondary p-6 sm:p-8 rounded-lg lg:rounded-l-none lg:rounded-r-lg flex-col justify-center border-2 border-primary">
            <div className="text-blanc">
              <h1 className="text-3xl font-bold mb-4">LEVEL UP TON GAME !</h1>
              <p className="font-medium mb-8">
                AFFRONTE DES JOUEURS PASSIONNÉS SUR DES CHALLENGES ÉPIQUES ET
                DEVIENS LE MEILLEUR DU CLASSEMENT
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-cta rounded-full p-2 w-10 h-10 flex items-center justify-center">
                    {/* SVG */}
                  </div>
                  <span className="ml-4 font-bold">+ DE 50 000 JOUEURS</span>
                </div>

                <div className="flex items-center">
                  <div className="bg-cta rounded-full p-2 w-10 h-10 flex items-center justify-center">
                    {/* SVG */}
                  </div>
                  <span className="ml-4 font-bold">+ DE 1 000 DÉFIS</span>
                </div>

                <div className="flex items-center">
                  <div className="bg-cta rounded-full p-2 w-10 h-10 flex items-center justify-center">
                    {/* SVG */}
                  </div>
                  <span className="ml-4 font-bold">+ DE 200 JEUX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
