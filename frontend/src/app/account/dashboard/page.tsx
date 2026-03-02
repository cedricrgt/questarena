"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { User } from "@/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import ChangePasswordModal from "@/app/components/auth/ChangePasswordModal";

import Image from "next/image";

export default function AccountDashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const [userObject, setUserObject] = useState<User | null>(null);
  const router = useRouter();
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (!isLoading && user === null) {
      router.replace("/");
      return;
    }

    if (user) {
      apiFetch(`/user/${user.id}`)
        .then(setUserObject)
        .catch(() => {});
    }
  }, [isLoading, user, router]);

  if (isLoading) return <p>Loading…</p>;
  if (!user) return null;

  return (
    <main className="mt-[10%] w-full max-w-2xl mx-auto bg-blanc rounded-xl shadow-lg p-8 flex flex-col gap-8">
      {/* Profile */}
      <div className="flex items-center gap-6">
        <Image
          src={user.avatar_url}
          alt="Avatar"
          width={80}
          height={80}
          className="rounded-full border-4 border-primary shadow"
        />
        <div>
          <h1 className="text-3xl font-bold font-logo text-primary">
            {user.name}
          </h1>
          <p className="text-secondary font-secondary">{user.email}</p>
          <p className="text-xs text-noir/60 mt-1">
            Membre depuis : {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 justify-between">
        <div className="flex-1 min-w-[120px] bg-primary/10 rounded-lg p-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">
            {userObject?.challenges?.length ?? 0}
          </span>
          <span className="text-sm text-noir/70">Challenges créés</span>
        </div>
        <div className="flex-1 min-w-[120px] bg-secondary/10 rounded-lg p-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-secondary">
            {userObject?.participations?.length ?? 0}
          </span>
          <span className="text-sm text-noir/70">Participations</span>
        </div>
        <div className="flex-1 min-w-[120px] bg-cta/10 rounded-lg p-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-cta">
            {userObject?.votes?.length ?? 0}
          </span>
          <span className="text-sm text-noir/70">Votes</span>
        </div>
      </div>

      {/* Settings Section */}
      <section className="bg-gray-100 rounded-lg p-4">
        <h2 className="text-lg font-bold text-primary mb-3">Paramètres</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowChangePassword(true)}
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/80 transition"
          >
            🔐 Modifier mon mot de passe
          </button>
          {user.role === "ADMIN" && (
            <button
              onClick={() => router.push("/admin")}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              ⚙️ Administration
            </button>
          )}
        </div>
      </section>

      {/* Mes Challenges */}
      <section className="mt-4">
        <h2 className="text-2xl font-bold text-primary mb-4">Mes Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userObject?.challenges?.map((challenge) => (
            <a key={challenge.id} href={`/details/${challenge.id}`}>
              <div className="bg-background rounded-lg p-4 shadow transform transition-transform hover:scale-105 hover:shadow-lg">
                <h3 className="text-xl font-semibold">{challenge.title}</h3>

                <p className="text-sm text-secondary">
                  {challenge.game} - {challenge.difficulty}
                </p>
                <p className="mt-2 text-noir">{challenge.description}</p>
                {challenge.image_url && (
                  <div className="relative mt-2 w-full h-32">
                    <Image
                      src={challenge.image_url}
                      alt={challenge.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Mes Participations */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Mes Participations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userObject?.participations?.map((part) => (
            <a key={part.id} href={`/details/${part.challenge_id}`}>
              <div className="bg-background rounded-lg p-4 shadow transform transition-transform hover:scale-105 hover:shadow-lg">
                <p className="text-white">{part.description}</p>

                <a
                  href={part.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-cta font-semibold hover:underline"
                >
                  Voir la vidéo
                </a>
              </div>
            </a>
          ))}
        </div>
      </section>

      <button
        onClick={logout}
        className="px-3 py-1 bg-red-500 text-white rounded self-start hover:bg-red-600 transition"
      >
        Déconnexion
      </button>

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePasswordModal
          userId={user.id}
          onClose={() => setShowChangePassword(false)}
        />
      )}
    </main>
  );
}

