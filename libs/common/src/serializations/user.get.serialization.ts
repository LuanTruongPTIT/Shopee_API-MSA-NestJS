import { faker } from '@faker-js/faker';
import {
  ENUM_USER_SIGN_UP_FROM,
  UserVerifyStatus,
} from '@libs/common/constants/user.enum';
import { ResponseIdSerialization } from '@libs/common/response/serializations/response.id.serialization';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { RoleGetSerialization } from './role.get.serialization';
export class UserGetSerialization extends ResponseIdSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    type: () => RoleGetSerialization,
  })
  @Type(() => RoleGetSerialization)
  readonly role: RoleGetSerialization;

  @ApiProperty({
    example: faker.internet.userName(),
    nullable: true,
    required: false,
  })
  readonly username?: string;

  readonly name: string;
  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.internet.email(),
  })
  readonly email: string;

  @ApiProperty({
    nullable: true,
    required: false,
    example: faker.internet.email(),
  })
  readonly mobileNumber?: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: true,
  })
  readonly isActive: boolean;

  @ApiProperty({
    required: true,
    nullable: false,
    example: true,
  })
  readonly inactivePermanent: boolean;

  @ApiProperty({
    nullable: true,
    required: false,
    example: faker.date.recent(),
  })
  readonly inactiveDate?: Date;

  @ApiProperty({
    required: true,
    nullable: false,
    example: false,
  })
  readonly blocked: boolean;

  @ApiProperty({
    nullable: true,
    required: false,
    example: faker.date.recent(),
  })
  readonly blockedDate?: Date;

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.person.firstName(),
  })
  readonly firstName: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.person.lastName(),
  })
  readonly lastName: string;

  @ApiProperty({
    nullable: true,
    required: false,
    type: () => String,
  })
  @Type(() => String)
  readonly photo?: string;

  @ApiHideProperty()
  @Exclude()
  readonly password: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.date.future(),
  })
  readonly passwordExpired: Date;

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.date.past(),
  })
  readonly passwordCreated: Date;

  @ApiProperty({
    required: true,
    nullable: false,
    example: [1, 0],
  })
  readonly passwordAttempt: number;

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.date.recent(),
  })
  readonly signUpDate: Date;

  @ApiProperty({
    required: true,
    nullable: false,
    example: ENUM_USER_SIGN_UP_FROM.LOCAL,
  })
  readonly signUpFrom: ENUM_USER_SIGN_UP_FROM;

  @ApiHideProperty()
  @Exclude()
  readonly salt: string;

  @ApiHideProperty()
  @Exclude()
  verify: UserVerifyStatus;

  @ApiProperty({
    description: 'Date created at',
    example: faker.date.recent(),
    required: true,
    nullable: false,
  })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Date updated at',
    example: faker.date.recent(),
    required: true,
    nullable: false,
  })
  readonly updatedAt: Date;

  @ApiHideProperty()
  @Exclude()
  readonly deletedAt?: Date;
}
