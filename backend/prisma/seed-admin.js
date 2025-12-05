const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding admin user...');

  const adminPassword = await bcrypt.hash('778195Cedric', 10);

  const admin = await prisma.user.upsert({
    where: { userName: 'admin.cr' },
    update: {
      password_hash: adminPassword,
      role: 'ADMIN',
    },
    create: {
      userName: 'admin.cr',
      email: 'admin.cr@example.com',
      password_hash: adminPassword,
      avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin',
      role: 'ADMIN',
    },
  });

  console.log(`✅ Admin user upserted: ${admin.userName}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
