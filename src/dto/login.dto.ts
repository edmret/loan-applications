import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'Username', description: 'the provided username' })
  username: string;

  @ApiProperty({ example: 'Password', description: 'login password' })
  password: string;
}
