import { Entity, Column, ObjectIdColumn } from 'typeorm';

import {
  ENUM_USER_SIGN_UP_FROM,
  UserVerifyStatus,
} from '../../constants/user.enum';
import { BaseEntityDto } from '@libs/common/base/base-entity.dto';

@Entity('UserEntity')
export class UserEntity extends BaseEntityDto {
  // @ObjectIdColumn()
  // _id: string;

  @Column({ type: 'string' })
  username: string;

  @Column({ type: 'string' })
  firstName: string;

  @Column({ type: 'string' })
  lastName: string;

  @Column({ type: 'string' })
  mobileNumber: string;

  @Column({ type: 'string' })
  email: string;

  @Column({ type: 'string' })
  role: string;

  @Column({ type: 'string' })
  password: string;

  @Column({ type: 'date' })
  passwordExpired: Date;

  @Column({ type: 'date' })
  passwordCreated: Date;

  @Column({ type: 'number' })
  passwordAttempt: number;

  @Column({ type: 'date' })
  signUpDate: Date;

  @Column({ enum: ENUM_USER_SIGN_UP_FROM })
  signUpFrom: ENUM_USER_SIGN_UP_FROM;

  @Column({ type: 'string' })
  salt: string;

  @Column({ type: Boolean })
  isActive: boolean;

  @Column({ type: Boolean })
  inactivePermanent: boolean;

  @Column({ type: Date })
  inactiveDate: Date;

  @Column({ type: Boolean })
  blocked: boolean;

  @Column({ type: Date })
  blockedDate: Date;

  @Column({ type: String })
  photo: string;

  @Column({ enum: UserVerifyStatus })
  verify: UserVerifyStatus;

  @Column({ type: 'string' })
  email_verify_token: string;
}
