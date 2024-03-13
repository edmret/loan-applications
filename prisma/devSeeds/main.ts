import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Role } from '../../src/constants/role.enum';
import { ApplicationStatusEnum } from '../../src/constants/application.enum';

const saltRounds = 10;

const prisma = new PrismaClient();

async function seed() {
  // check if user admin already exists
  const admin = await prisma.user.findUnique({
    where: {
      username: 'admin',
    },
  });

  // if admin already exists, do not seed
  if (admin) {
    console.log('Admin already exists. Skipping seeding...');
    return;
  }

  // seed roles
  await prisma.role.create({
    data: {
      name: Role.Admin,
      id: Role.Admin,
    },
  });

  await prisma.role.create({
    data: {
      name: Role.Applicant,
      id: Role.Applicant,
    },
  });

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
      amount: 100000,
      interest: 100000 * 0.1 * 2,
      duration: 2,
      userId: adminUser.id,
      createdAt: '2024-03-12T23:59:56.370Z',
      updatedAt: '2024-03-12T23:59:56.370Z',
      status: ApplicationStatusEnum.submitted,
    },
  });

  await prisma.loan.create({
    data: {
      amount: 2456,
      interest: 245.6 * 6,
      duration: 6,
      userId: adminUser.id,
      createdAt: '2024-03-12T23:59:56.370Z',
      updatedAt: '2024-03-12T23:59:56.370Z',
      status: ApplicationStatusEnum.approved,
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
