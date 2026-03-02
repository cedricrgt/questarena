import { PrismaClient, Difficulty, TargetType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const alicePassword = await bcrypt.hash('alice123', 10);
  const user1 = await prisma.user.upsert({
    where: { userName: 'alice' },
    update: {},
    create: {
      userName: 'alice',
      email: 'alice@example.com',
      password_hash: alicePassword,
      avatar_url: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
  });

  const bobPassword = await bcrypt.hash('bob456', 10);
  const user2 = await prisma.user.upsert({
    where: { userName: 'bob' },
    update: {},
    create: {
      userName: 'bob',
      email: 'bob@example.com',
      password_hash: bobPassword,
      avatar_url: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
  });

  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { userName: 'admin' },
    update: {
      password_hash: adminPassword,
      role: 'ADMIN',
    },
    create: {
      userName: 'admin',
      email: 'admin@example.com',
      password_hash: adminPassword,
      avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin',
      role: 'ADMIN',
    },
  });


  const randomId = Math.floor(Math.random() * 50) + 1;
  const challenge1 = await prisma.challenge.create({
    data: {
      title: 'Speedrun challenge',
      description: 'Finish the game as fast as possible',
      rules: 'No cheats, no glitches',
      game: 'SuperFastGame',
      difficulty: Difficulty.MEDIUM,
      validated: true,
      image_url: `https://via.assets.so/game.webp?id=${randomId}`,
      creator: { connect: { id: user1.id } },
    },
  });

  const participation1 = await prisma.participation.create({
    data: {
      user: { connect: { id: user2.id } },
      challenge: { connect: { id: challenge1.id } },
      video_url:
        'https://www.youtube.com/watch?v=KEpjLAzTod8&ab_channel=olivierhorps',
      description: 'My best run ever!',
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

  console.log('✅ Seeding terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur pendant le seeding :', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });