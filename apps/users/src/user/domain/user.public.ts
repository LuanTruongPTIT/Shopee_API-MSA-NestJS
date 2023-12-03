/* eslint-disable no-unreachable */
import { AggregateRoot } from '@nestjs/cqrs';
import { ENUM_USER_SIGN_UP_FROM } from '../constants/user.enum';
import { IUserGoogleEntity } from '../interface/user.interface';
import { CreateUserSuccessEvent } from './event/create-user.event';
export type UserEssentialProperties = Readonly<
  Required<{
    id: string;
    email: string;
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

export type UserProperties = UserEssentialProperties;

export interface User {
  open: () => void;
  commit: () => void;
}
export class UserImplement extends AggregateRoot implements User {
  private readonly tokenEmail: string;
  private readonly id: string;
  private readonly email: string;
  constructor(properties: UserProperties) {
    super();
    Object.assign(this, properties);
  }

  open(): void {
    this.apply(
      new CreateUserSuccessEvent(this.id, this.tokenEmail, this.email),
    );
  }
}
