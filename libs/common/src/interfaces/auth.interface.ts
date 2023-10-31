import {
  ENUM_AUTH_LOGIN_FROM,
  ENUM_AUTH_LOGIN_WITH,
} from '../constants/auth.enum.constants';

export interface IAuthPassword {
  salt: string;
  passwordHash: string;
  passwordExpired: Date;
  passwordCreated: Date;
}
export interface IAuthPayloadOptions {
  loginWith: ENUM_AUTH_LOGIN_WITH;
  loginFrom: ENUM_AUTH_LOGIN_FROM;
  loginDate: Date;
}
export interface IAuthRefreshTokenOptions {
  // in milis
  notBeforeExpirationTime?: number | string;
}
