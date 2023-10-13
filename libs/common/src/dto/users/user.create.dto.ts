import { faker } from '@faker-js/faker';
import { MobileNumberAllowed } from '@libs/common/request/validations/request.mobile-number-allowed.validation';
import { ApiProperty } from '@nestjs/swagger';
import { ENUM_USER_SIGN_UP_FROM } from 'apps/user_v2/src/user/constants/user.enum';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    example: faker.internet.email(),
  })
  @IsNotEmpty()
  @MaxLength(100)
  @IsEmail()
  @Type(() => String)
  readonly email: string;

  @ApiProperty({
    example: faker.person.firstName(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  @Type(() => String)
  readonly firstName: string;

  @ApiProperty({
    example: faker.person.firstName(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  @Type(() => String)
  readonly lastName: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(14)
  @ValidateIf((e) => e.mobileNumber !== '')
  @Type(() => String)
  @MobileNumberAllowed()
  readonly mobileNumber?: string;

  @ApiProperty({
    example: faker.string.uuid(),
    required: true,
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly role: string;

  @ApiProperty({
    description: 'string password',
    example: `${faker.string.alphanumeric(5).toLowerCase()}${faker.string
      .alphanumeric(5)
      .toUpperCase()}@@!123`,
    required: true,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(50)
  readonly password: string;

  @ApiProperty({
    example: ENUM_USER_SIGN_UP_FROM,
  })
  @IsEnum(ENUM_USER_SIGN_UP_FROM)
  @IsString()
  @IsNotEmpty()
  readonly signUpFrom: ENUM_USER_SIGN_UP_FROM;
}
