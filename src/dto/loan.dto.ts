import { ApiProperty } from '@nestjs/swagger';

export class LoanApplicationDto {
  @ApiProperty({ example: 'Id', description: 'The id of the application' })
  id: string;
  @ApiProperty({ example: 1000, description: 'The amount of the loan' })
  amount: number;
  @ApiProperty({ example: 10, description: 'The interest rate' })
  interest: number;
  @ApiProperty({ example: 3, description: 'The duration of the loan' })
  duration: number;
  @ApiProperty({
    example: 'User',
    description: 'The user that applied for the loan',
  })
  userId: string;
  @ApiProperty({
    example: '2021-10-10',
    description: 'The date the application was created',
  })
  createdAt: Date;
  @ApiProperty({
    example: '2021-10-10',
    description: 'The date the application was last updated',
  })
  updatedAt: Date;
  @ApiProperty({
    example: 'submitted',
    description: 'The status of the application',
  })
  status: string;
}

export class CreateLoanApplicationDto {
  @ApiProperty({ example: 1000, description: 'The amount of the loan' })
  amount: number;
  @ApiProperty({ example: 3, description: 'The duration of the loan' })
  duration: number;
}
