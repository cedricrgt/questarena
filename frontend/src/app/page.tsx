import Button from "./components/button/button";
import Hero from "./components/hero/Hero";
import ChallengeCard from "./components/challengeCard/challengeCard";
import Leaderboard from './components/leaderboard/leaderboard';
import ParticipationCard from './components/participationCard/participationCard';
import { Challenge } from "@/types";
import { apiFetch } from "@/lib/api";

const challenges: Challenge[] = await apiFetch("/challenge");

  const fakeParticipations = [
  {
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Super combo de ouf 🔥',
    nbVotes: 42,
    challenge: 'Défi Combo Parfait',
    userId: 2
  },
  {
    link: 'https://youtu.be/3JZ_D3ELwOQ',
    title: 'Victoire en 10 secondes',
    nbVotes: 15,
    challenge: 'Speedrun Éclair',
    userId: 1
  },
  {
    link: 'https://www.youtube.com/watch?v=oHg5SJYRHA0',
    title: 'Clutch incroyable à la dernière seconde !',
    nbVotes: 88,
    challenge: 'Sauvetage Inespéré',
    userId: 3
  },
];

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
  }
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="w-4/5 mx-auto  my-11">
        <h2 className="text-xl font-bold mb-4">Défis tendances</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-6">
          {challenges.map((challenge, i) => (
            <ChallengeCard key={i} {...challenge} />
          ))}
      </div>

      <h2 className="text-xl font-bold mb-4 mt-10">Les participations récentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-6 ">
        {fakeParticipations.map((item, index) => (
        <ParticipationCard
          key={index}
          link={item.link}
          title={item.title}
          nbVotes={item.nbVotes}
          challenge={item.challenge}
          userId={item.userId}
        />

      ))}
      </div>
      <h2 className="text-xl font-bold mb-4 mt-10">Leaderboard</h2>
      <div className="container">
        <Leaderboard leaderboard={leaderboardData} color='text-gray-600' backgroundColor='bg-white' centered={false}/>
        </div>     
      </section>

  
    </>
  );
}
