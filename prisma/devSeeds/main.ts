import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Role } from '../../src/enums/role.enum';

const saltRounds = 10;

const prisma = new PrismaClient();

async function seed() {
  // Seed users
  const password = await bcrypt.hash('admin', saltRounds);

  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      password,
      roles: {
        connectOrCreate: [
          {
            where: {
              id: Role.Admin,
            },
            create: {
              name: Role.Admin,
              id: Role.Admin,
            },
          },
        ],
      },
    },
    include: {
      roles: true,
    },
  });

  await prisma.loan.create({
    data: {
      amount: 100,
      interest: 20,
      duration: 2,
      userId: adminUser.id,
      createdAt: '2024-03-12T23:59:56.370Z',
      updatedAt: '2024-03-12T23:59:56.370Z',
      status: 'submitted',
    },
  });

  console.log('Database has been seeded.');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
