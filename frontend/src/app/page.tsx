import Button from "./components/button/button";
import Hero from "./components/hero/Hero";
import ChallengeCard from "./components/challengeCard/challengeCard";

const challenges = [
  {
    imageSrc: "/images/home/voidbreaker.webp",
    game: "Voidbreaker",
    title: "Speedrun Boss Rush",
    participants: 50,
  },
  {
    imageSrc: "/images/home/mythra.webp",
    game: "Myhra",
    title: "No Hit Run",
    participants: 32,
  },
  {
    imageSrc: "/images/home/ashes-cover.webp",
    game: "Ashe",
    title: "Score Max",
    participants: 87,
  },
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
      </section>
    </>
  );
}
