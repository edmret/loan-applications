import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Username', description: 'the new username' })
  username: string;

  @ApiProperty({ example: 'Password', description: 'the new password' })
  password: string;
}
