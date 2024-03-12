import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty({
    example: 'Access token',
    description:
      'The authentication token necessary for soing requests on the application',
  })
  access_token: string;
}
