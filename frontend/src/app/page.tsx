import ChallengeCard from './components/challengeCard/challengeCard';

const challenges = [
  {
    imageSrc: '/images/voidbreaker.jpg',
    game: 'Voidbreaker',
    title: 'Speedrun Boss Rush',
    participants: 50,
  },
  {
    imageSrc: '/images/mythra.jpg',
    game: 'Myhra',
    title: 'No Hit Run',
    participants: 32,
  },
  {
    imageSrc: '/images/ashe.jpg',
    game: 'Ashe',
    title: 'Score Max',
    participants: 87,
  },
];

export default function Home() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Défis tendances</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((challenge, i) => (
          <ChallengeCard key={i} {...challenge} />
        ))}
      </div>
    </section>
  );
}