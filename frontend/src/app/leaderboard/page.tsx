import { LeaderboardType } from "@/types";
import Leaderboard from "../components/leaderboard/leaderboard";
import { apiFetch } from "@/lib/api";
import BackButton from "../components/backButton/backButton";

export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  let leaderboard: LeaderboardType[] = [];
  
  try {
    leaderboard = await apiFetch("/user/leaderboard?limit=10");
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    // On error, leaderboard remains empty array
  }

  return (
    <section className="py-16 bg-secondary relative min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/assets/bg-leaderboard.webp')`,
          zIndex: 0,
        }}
      ></div>

      {/* Overlay with transparent color */}
      <div className="absolute inset-0 z-1" style={{ background: 'rgba(74, 32, 64, 0.6)' }}></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 ">
        <div className="absolute top-0 left-4 md:left-0 z-20">
          <BackButton />
        </div>
        <h2 className="text-3xl font-bold  text-center text-white mb-8">Top Challengers</h2>
        <Leaderboard leaderboard={leaderboard} color={"text-white"} backgroundColor={"bg-transparent"} centered={true} />
      </div>
    </section>
  );
}