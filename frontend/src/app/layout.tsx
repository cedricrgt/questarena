import "./globals.css";
import type { ReactNode } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { AuthProvider } from "@/lib/auth-context";
import { NavigationProvider } from "@/lib/navigation-context";
import GameClientLayout from "./components/layout/GameClientLayout";

export const metadata = {
  title: "Mon site",
  description: "Bienvenue sur mon site",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <NavigationProvider>
            <Header />
            <GameClientLayout>
              <main className="">{children}</main>
              <div id="modal-root" />
            </GameClientLayout>
            <Footer />
          </NavigationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
