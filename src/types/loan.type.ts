import { User } from './User.type';

export interface LoanApplication {
  id: string;
  amount: number;
  interest: number;
  duration: number;
  user: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
