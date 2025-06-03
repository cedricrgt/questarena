import ChallengeCard from './components/challengeCard/challengeCard';
import ParticipationCard from './components/participationCard/participationCard';

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

export default function Home() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Défis tendances</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((challenge, i) => (
          <ChallengeCard key={i} {...challenge} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4 mt-10">Les participations récentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
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
    </section>

  
  );
}