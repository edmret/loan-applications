import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from 'src/constants/role.enum';
import { PrismaService } from 'src/db/prisma.service';
import { User } from 'src/types/User.type';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { username: string; password: string; roles: string[] }) {
    // check if the user already exists
    const user = await this.findOne(data.username);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    return this.prisma.user.create({
      data: {
        ...data,
        roles: {
          connectOrCreate: [
            {
              where: {
                id: Role.Applicant,
              },
              create: {
                name: Role.Applicant,
                id: Role.Applicant,
              },
            },
          ],
        },
      },
      include: {
        roles: true,
      },
    });
  }

  async findOne(
    username: string,
    includeRoles: boolean = false,
  ): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { roles: includeRoles },
    });

    if (!user) {
      return undefined;
    }

    return {
      ...user,
      roles: user.roles?.map((role) => role.id) ?? [],
    };
  }
}
