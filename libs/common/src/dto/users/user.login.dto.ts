import { IsString, IsNotEmpty } from 'class-validator';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from '../../decorators/check-password.decorator';
export class UserLoginDto {
  @ApiProperty({
    example: '',
    description: 'User Id',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: faker.internet.email(),
    description: 'Email of user',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: '0822036246luanvy@L',
    description: 'password of user',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
