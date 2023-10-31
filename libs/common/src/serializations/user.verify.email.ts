import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    description: 'token to verify email',
  })
  token: string;
}
