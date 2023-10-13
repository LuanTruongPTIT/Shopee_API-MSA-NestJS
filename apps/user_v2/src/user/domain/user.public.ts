/* eslint-disable no-unreachable */
import { AggregateRoot } from '@nestjs/cqrs';
import { ENUM_USER_SIGN_UP_FROM } from '../constants/user.enum';
import { IUserGoogleEntity } from '../interface/user.interface';
import { CreateUserSuccessEvent } from './event/create-user.event';
export type UserEssentialProperties = Readonly<
  Required<{
    username: string;
    email: string;
    mobileNumber: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    signUpFrom: ENUM_USER_SIGN_UP_FROM;
    tokenEmail: string;
  }>
>;
export type UserOptionalProperties = Readonly<
  Partial<{
    isActive: boolean;
    blocked: boolean;
    blockedDate: Date;
    photo: string;
    google: IUserGoogleEntity;
    passwordExpired: Date;
    passwordCreated: Date;
    passwordAttempt: number;
    signUpDate: string;
    salt: string;
  }>
>;

export type UserProperties = UserEssentialProperties &
  Required<UserOptionalProperties>;

export interface User {
  open: () => void;
}
export class UserImplement extends AggregateRoot implements User {
  private readonly username: string;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly mobileNumber: string;
  private readonly email: string;
  private readonly role: string;
  private readonly password: string;
  private readonly passwordExpired: Date;
  private readonly passwordCreated: Date;
  private readonly passwordAttempt: number;
  private readonly signUpdate: Date;
  private readonly signUpFrom: ENUM_USER_SIGN_UP_FROM;
  private readonly salt: string;
  private readonly isActive: boolean;
  private readonly inactivePermanent: boolean;
  private readonly inactiveDate: Date;
  private readonly blocked: boolean;
  private readonly blockedDate: Date;
  private readonly photo: string;
  private readonly google: IUserGoogleEntity;
  private readonly tokenEmail: string;
  private readonly id: string;
  constructor(properties: UserProperties) {
    super();
    Object.assign(this, properties);
  }

  open(): void {
    this.apply(new CreateUserSuccessEvent(this.id, this.tokenEmail));
  }
}
