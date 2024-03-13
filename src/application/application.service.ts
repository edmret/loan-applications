import { Injectable } from '@nestjs/common';
import { ApplicationStatusEnum } from 'src/constants/application.enum';
import { PrismaService } from 'src/db/prisma.service';
import { CreateLoanApplicationDto } from 'src/dto/loan.dto';

// TODO: move to config or database settings
/**
 * the interest rate is 10%
 */
const INTEREST_RATE = 0.1;

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateLoanApplicationDto, userId: string) {
    const interest = this.calculateInterest(data.amount, data.duration);
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
    const application = await this.prisma.loan.findUnique({
      where: { id },
    });

    return {
      ...application,
      accepted: this.getAcceptanceStatus(
        application.status as ApplicationStatusEnum,
      ),
    };
  }

  async findAll() {
    const applications = await this.prisma.loan.findMany();
    return applications.map((application) => ({
      ...application,
      accepted: this.getAcceptanceStatus(
        application.status as ApplicationStatusEnum,
      ),
    }));
  }

  //TODO: create real logic for interest calculation
  private calculateInterest(amount: number, duration: number) {
    return amount * INTEREST_RATE * duration;
  }

  private getAcceptanceStatus(status: ApplicationStatusEnum): boolean {
    //TODO: create real logic for acceptance status
    return status === ApplicationStatusEnum.approved;
  }
}
