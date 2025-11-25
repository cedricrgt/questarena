"use client";

import { useEffect, useState } from "react";
import Hero from "./components/hero/Hero";
import ChallengeCard from "./components/challengeCard/challengeCard";
import Leaderboard from "./components/leaderboard/leaderboard";
import { Challenge, LeaderboardType } from "@/types";
import { apiFetch } from "@/lib/api";

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/user/leaderboard")
      .then((data) => setLeaderboard(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    apiFetch("/challenge")
      .then((data) => setChallenges(data))
      .finally(() => setLoading(false));
  }, []);

  // Trie les challenges d'abord par nombre de participations décroissant, puis par la date de la participation la plus récente
  const sortedChallenges = [...challenges].sort((a, b) => {
    // 1. Par nombre de participations décroissant
    if ((b.participations?.length ?? 0) !== (a.participations?.length ?? 0)) {
      return (b.participations?.length ?? 0) - (a.participations?.length ?? 0);
    }
    // 2. Si égalité, par date de participation la plus récente décroissante
    const aLast =
      (a.participations?.length ?? 0) > 0
        ? Math.max(
          ...(a.participations ?? []).map((p) =>
            new Date(p.created_at).getTime()
          )
        )
        : 0;
    const bLast =
      (b.participations?.length ?? 0) > 0
        ? Math.max(
          ...(b.participations ?? []).map((p) =>
            new Date(p.created_at).getTime()
          )
        )
        : 0;
    return bLast - aLast;
  });

  // Garde que les challenges qui ont au moins une participation
  const filteredChallenges = sortedChallenges.filter(
    (ch) => (ch.participations?.length ?? 0) > 0
  );
  const visibleChallenges = filteredChallenges.slice(0, visibleCount);

  return (
    <>
      <Hero />
      <section className="w-full max-w-6xl mx-auto my-8 px-4">
        <h2 className="text-2xl font-bold mb-6 mt-4 text-secondary drop-shadow-[0_0_8px_rgba(169,111,255,0.6)] font-primary uppercase tracking-wider">
          Défi tendance
        </h2>
        {loading ? (
          <div className="text-center py-10 text-gray-400 animate-pulse">Chargement des données...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto w-3/4 sm:w-full justify-center">
              {visibleChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} id={challenge.id} />
              ))}
            </div>
            {visibleCount < filteredChallenges.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 rounded-sm font-bold bg-cta text-noir hover:bg-cta/80 hover:shadow-[0_0_15px_rgba(233,184,114,0.6)] transition-all duration-300 uppercase tracking-widest clip-path-polygon"
                  style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
                >
                  Voir plus de challenge
                </button>
              </div>
            )}
          </>
        )}

        <h2 className="text-2xl font-bold mb-6 mt-12 text-secondary drop-shadow-[0_0_8px_rgba(169,111,255,0.6)] font-primary uppercase tracking-wider">
          Leaderboard
        </h2>
        <div className="bg-noir/50 backdrop-blur-md rounded-lg border border-primary/30 p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <Leaderboard
            leaderboard={leaderboard}
            color="text-gray-200"
            backgroundColor="bg-transparent"
            centered={false}
          />
        </div>
      </section>
    </>
  );
}
