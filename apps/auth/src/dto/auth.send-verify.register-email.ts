import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class verifyEmailRegisterDTO {
  @ApiProperty({
    example: faker.internet.email(),
    description: 'Email is verify',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  toAddress: string;

  @ApiProperty({
    example: faker.internet.email(),
    description: 'Will be valid Eamil Token Encode string When user register',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email_verify_token: string;
}
