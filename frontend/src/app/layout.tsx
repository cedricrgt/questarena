import "./globals.css";
import type { ReactNode } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

export const metadata = {
  title: "Mon site",
  description: "Bienvenue sur mon site",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
