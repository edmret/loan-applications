import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export interface User {
  userId: number;
  username: string;
  password: string;
  roles: string[];
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: ['admin'],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: ['applicant'],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
