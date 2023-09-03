/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntityDto } from '@libs/common/base/base-entity.dto';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsMobilePhone,
} from 'class-validator';
import { Column, Entity, BeforeInsert } from 'typeorm';
import { ErrorUtils } from '@libs/common/utils/errorUtils';
import { ERR } from '@libs/common/constants/error';
import bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { USER_GENDER } from '../../constants/user.enum.constant';
import { IsStrongPassword } from '../../decorator/check-password.decorator';
import { RoleDto } from './roles.dto';

export interface AddressType {
  street: string;
  city: string;
  country: string;
  code: number;
}
@Entity('users')
export class UserDto extends BaseEntityDto {
  constructor(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    bio: string,
    birthday: Date,
    isActive: boolean,
    gender: USER_GENDER,
    address: AddressType[],
    avatar: string,
    lock_expries: number,
    failures_num: number,
    email_verify_token: boolean,
    shop_name: string,
    phone_number: string,
    roles: RoleDto[],
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.address = address;
    this.birthday = birthday;
    this.bio = bio;
    this.isActive = isActive;
    this.avatar = avatar;
    this.lock_expries = lock_expries;
    this.gender = gender;
    this.phone_number = phone_number;
    this.roles = roles;
  }

  @IsString(ErrorUtils.getMessage('firstName', ERR.IsString))
  @IsNotEmpty(ErrorUtils.getMessage('firstName', ERR.IsNotEmpty))
  @Column()
  @ApiProperty({
    example: 'Truong',
    description: 'The first name of the User',
  })
  firstName: string;

  @IsString(ErrorUtils.getMessage('lastName', ERR.IsString))
  @IsOptional()
  @Column()
  @ApiProperty({
    example: 'Luan',
    description: 'The last name of the User',
  })
  lastName: string;

  @IsStrongPassword(ErrorUtils.getMessage('password', ERR.IsPasswordStrong))
  @IsString(ErrorUtils.getMessage('password', ERR.IsString))
  @ApiProperty({
    type: 'string',
    example: '0822036246luanvy@L',
  })
  @Column({
    select: false,
    nullable: false,
  })
  password: string;

  @IsString(ErrorUtils.getMessage('username', ERR.IsString))
  @IsNotEmpty(ErrorUtils.getMessage('username', ERR.IsNotEmpty))
  @ApiProperty({
    type: 'string',
    example: 'luantruong123',
  })
  @Column({ nullable: true, update: false, unique: true })
  username: string;

  @IsNotEmpty(ErrorUtils.getMessage('Email', ERR.IsEmpty))
  @IsEmail()
  @ApiProperty({
    type: 'string',
    example: 'luantruong@gmail.com',
  })
  @Column({ unique: true, update: false })
  email: string;

  @IsArray(ErrorUtils.getMessage('Address', ERR.IsArray))
  @ApiProperty({
    example: [
      {
        street: '50 man thien',
        city: 'HO CHI MINH',
        country: 'Viet Nam',
        code: '7002',
      },
    ],
  })
  @IsOptional()
  @Column()
  address: AddressType[];

  @IsDate()
  @ApiProperty({
    example: '12-2-2019',
  })
  @IsOptional()
  @Column()
  birthday: Date;

  @IsMobilePhone()
  @IsOptional()
  @Column()
  phone_number: string;

  @IsString()
  @ApiProperty({
    example: 'Shop Dev sell clothing',
  })
  @IsOptional()
  @Column()
  avatar: string;

  @IsOptional()
  @Column()
  bio: string;

  @IsOptional()
  @Column()
  gender: USER_GENDER;

  @Column()
  isActive: boolean;

  @IsOptional()
  @Column()
  lock_expries: number;

  @IsArray()
  @IsOptional()
  @Column((type) => RoleDto)
  roles: RoleDto[];

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
  }
}
