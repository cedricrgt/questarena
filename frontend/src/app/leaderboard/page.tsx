
import Leaderboard from "../components/leaderboard/leaderboard";

export default function LeaderboardPage() {
  const leaderboardData = [
  {
    imageUser: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "NinjaSlayer42",
    score: 247,
  },
  {
    imageUser: "https://randomuser.me/api/portraits/women/45.jpg",
    username: "ShadowFox",
    score: 198,
  },
  {
    imageUser: "https://randomuser.me/api/portraits/men/76.jpg",
    username: "DragonFury",
    score: 175,
  },
  {
    imageUser: "https://randomuser.me/api/portraits/women/12.jpg",
    username: "PixelQueen",
    score: 160,
  },
  {
    imageUser: "https://randomuser.me/api/portraits/men/54.jpg",
    username: "CyberRanger",
    score: 143,
  },
];
  return (
    <section className="py-16 bg-white">
       {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/assets/bg-leaderboard.webp')`,
          zIndex: 0,
        }}
      ></div>

      {/* Overlay with transparent color */}
      <div className="absolute inset-0 z-1" style={{  background: 'rgba(74, 32, 64, 0.6)' }}></div>

      {/* Content */}
      <h2 className="text-red-600"></h2>
        <div className="relative z-10 container mx-auto px-4 ">
            <h2 className="text-3xl font-bold  text-center text-white">Top Challengers</h2> 
            <Leaderboard leaderboard={leaderboardData} color={"text-white"} backgroundColor={"bg-transparent"} centered={true}/>
        </div>
    </section>
  );
}