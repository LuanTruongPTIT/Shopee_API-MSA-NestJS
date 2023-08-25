import { BaseEntityDto } from '@libs/common/base/base-entity.dto';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Column, Entity, BeforeInsert } from 'typeorm';
import { ErrorUtils } from '@libs/common/utils/errorUtils';
import { ERR } from '@libs/common/constants/error';
import bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { USER_GENDER } from '../../constants/user.enum.constant';
interface AddressType {
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
    // store: store[],
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.address = address;
    // this.birthday = birthday;
    // this.bio = bio;
    // this.isActive = isActive;
    // this.avatar = avatar;
    // this.lock_expries = lock_expries;
    // this.gender = gender;
    // this.store = store;
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

  @IsStrongPassword()
  @IsString(ErrorUtils.getMessage('password', ERR.IsString))
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
    example: {
      street: '50 man thien',
      city: 'HO CHI MINH',
      country: 'Viet Nam',
      code: '7002',
    },
  })
  @Column()
  address: AddressType[];

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
