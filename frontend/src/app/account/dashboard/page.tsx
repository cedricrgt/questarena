"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function AccountDashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  // redirect if they’re not supposed to see this…
useEffect(() => {
    if (!isLoading && user === null) {
      router.replace("/auth/signin");
    }
  }, [isLoading, user, router]);

  if (isLoading) return <p>Loading…</p>;
  if (!user)      return null;   // ← never try to do user.foo when user is null

  return (
    <main className="mt-[10%] w-full max-w-2xl mx-auto bg-blanc rounded-xl shadow-lg p-8 flex flex-col gap-8">
      {/* Profile */}
      <div className="flex items-center gap-6">
        <img
          src={user.avatar_url}
          alt="Avatar"
          className="w-20 h-20 rounded-full border-4 border-primary shadow"
        />
        <div>
          <h1 className="text-3xl font-bold font-logo text-primary">{user.name}</h1>
          <p className="text-secondary font-secondary">{user.email}</p>
          <p className="text-xs text-noir/60 mt-1">
            Membre depuis : {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background rounded-lg p-4 shadow flex flex-col gap-2">
          <span className="text-sm text-secondary font-semibold">Identifiant</span>
          <span className="font-mono text-white break-all">{user.id}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 justify-between">
        <div className="flex-1 min-w-[120px] bg-primary/10 rounded-lg p-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">{user.challenges?.length ?? 0}</span>
          <span className="text-sm text-noir/70">Challenges créés</span>
        </div>
        <div className="flex-1 min-w-[120px] bg-secondary/10 rounded-lg p-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-secondary">{user.participations?.length ?? 0}</span>
          <span className="text-sm text-noir/70">Participations</span>
        </div>
        <div className="flex-1 min-w-[120px] bg-cta/10 rounded-lg p-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-cta">{user.votes?.length ?? 0}</span>
          <span className="text-sm text-noir/70">Votes</span>
        </div>
      </div>
      <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">
          Déconnexion
      </button>
    </main>
  );
}
