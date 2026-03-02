"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Show banner after a small delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop with blur and darkness */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in" />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
        <div className="max-w-6xl mx-auto bg-noir/95 backdrop-blur-md border-2 border-secondary/50 rounded-lg shadow-[0_0_30px_rgba(169,111,255,0.4)] p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-secondary mb-2 flex items-center gap-2">
                <span className="text-2xl">🍪</span>
                Gestion des cookies
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                Nous utilisons uniquement des <strong className="text-blanc">cookies essentiels</strong> pour 
                assurer le bon fonctionnement de notre site (authentification et session). 
                Aucun cookie de tracking ou publicitaire n&apos;est utilisé.
              </p>
              <p className="text-xs text-gray-400">
                En continuant à utiliser ce site, vous acceptez l&apos;utilisation de ces cookies techniques. 
                Pour en savoir plus, consultez notre{" "}
                <Link 
                  href="/confidentialite" 
                  className="text-secondary hover:text-cta underline transition-colors"
                >
                  politique de confidentialité
                </Link>.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={declineCookies}
                className="px-6 py-2 border border-gray-500 text-gray-300 rounded hover:bg-gray-800 hover:border-gray-400 transition-all text-sm font-medium"
              >
                Refuser
              </button>
              <button
                onClick={acceptCookies}
                className="px-6 py-2 bg-gradient-to-r from-secondary to-cta text-noir rounded hover:shadow-[0_0_20px_rgba(169,111,255,0.6)] transition-all text-sm font-bold"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
