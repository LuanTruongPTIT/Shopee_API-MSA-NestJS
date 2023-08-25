import { BaseEntityDto } from '../../base/base-entity.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { ErrorUtils } from '../../utils/errorUtils';
import { ERR } from '@libs/common/constants/error';
@Entity('users')
export class UserDto extends BaseEntityDto {
  constructor(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  @IsString(ErrorUtils.getMessage('firstName', ERR.IsString))
  @IsNotEmpty(ErrorUtils.getMessage('firstName', ERR.IsNotEmpty))
  @Column()
  firstName: string;

  @IsString(ErrorUtils.getMessage('lastName', ERR.IsString))
  @IsOptional()
  @Column()
  lastName: string;

  @IsString(ErrorUtils.getMessage('password', ERR.IsString))
  @Column({
    select: false,
    nullable: false,
  })
  password: string;

  @IsString(ErrorUtils.getMessage('username', ERR.IsString))
  @IsNotEmpty(ErrorUtils.getMessage('username', ERR.IsNotEmpty))
  @Column({ nullable: true, update: false, unique: true })
  username: string;

  @IsString(ErrorUtils.getMessage('Email', ERR.IsString))
  @IsNotEmpty(ErrorUtils.getMessage('Email', ERR.IsEmpty))
  @Column({ unique: true, update: false })
  email: string;
}
