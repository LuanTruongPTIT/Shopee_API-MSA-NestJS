import { ApiProperty } from '@nestjs/swagger';

export class TokenVerifyEmailDto {
  @ApiProperty({
    required: true,
    nullable: false,
    description: 'token to verify email',
  })
  token: string;
}
