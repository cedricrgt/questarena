import { PrismaClient, Difficulty, TargetType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const user1 = await prisma.user.upsert({
     where: { userName: 'alice' },
     update:{}, 
    create: {
      userName: "alice",
      email: "alice@example.com",
      password_hash: "hashalice123",
      avatar_url: "https://example.com/avatar/alice.png",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { userName: 'bob' },
     update:{},
    create: {
      userName: "bob",
      email: "bob@example.com",
      password_hash: "hashbob456",
      avatar_url: "https://example.com/avatar/bob.png",
    },
  });

  
  const challenge1 = await prisma.challenge.create({
    data: {
      title: "Speedrun challenge",
      description: "Finish the game as fast as possible",
      rules: "No cheats, no glitches",
      game: "SuperFastGame",
      difficulty: Difficulty.MEDIUM,
      validated: true,
      creator: { connect: { id: user1.id } },
    },
  });


  const participation1 = await prisma.participation.create({
    data: {
      user: { connect: { id: user2.id } },           
      challenge:{connect: {id: challenge1.id}},
      video_url: "https://example.com/videos/bob_speedrun.mp4",
      description: "My best run ever!",
      validated: false,
    },
  });


  await prisma.vote.create({
  data: {
    user: { connect: { id: user1.id } },
    participation: { connect: { id: participation1.id } },
    target_type: 'PARTICIPATION',
  },
});

  await prisma.vote.create({
    data: {
      challenge: { connect: { id: challenge1.id } },
      user: { connect: { id: user2.id } },
      target_type: TargetType.CHALLENGE,
      
    },
  });

  console.log("✅ Seeding terminé !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seeding :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });