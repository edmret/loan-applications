import { Injectable } from '@nestjs/common';
import { ApplicationStatusEnum } from 'src/constants/application.enum';
import { PrismaService } from 'src/db/prisma.service';
import { CreateLoanApplicationDto } from 'src/dto/loan.dto';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateLoanApplicationDto, userId: string) {
    // TODO: create spezialized service for calculate interests
    const interest = data.amount * 0.1 * data.duration;
    return this.prisma.loan.create({
      data: {
        ...data,
        userId,
        status: ApplicationStatusEnum.submitted,
        interest,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findById(id: string) {
    return this.prisma.loan.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.loan.findMany();
  }
}
