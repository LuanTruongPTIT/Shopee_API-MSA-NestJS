export interface IUserGoogleEntity {
  accessToken: string;
  refreshToken: string;
}
export interface IAuthPassword {
  salt: string;
  passwordHash: string;
  passwordExpired: Date;
  passwordCreated: Date;
}
