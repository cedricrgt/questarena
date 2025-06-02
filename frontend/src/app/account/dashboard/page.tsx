"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function AccountDashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mon Compte</h1>
      <div className="bg-white shadow rounded p-4">
        <p className="mb-2">
          <strong>Nom&nbsp;:</strong> {user?.name}
        </p>
        <p>
          <strong>Email&nbsp;:</strong> {user?.email}
        </p>
      </div>
      {/* ajouté user profile info ici : */}

        {/* boutton pour test la déco */}
        <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">
          Déconnexion
        </button>
    </div>
  );
}
