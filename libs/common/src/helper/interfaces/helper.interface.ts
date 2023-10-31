export interface IHelperDateOptionsCreate {
  startOfDay?: boolean;
}
export interface IHelperDateOptionsForward {
  fromDate?: Date;
}
export interface IHelperJwtVerifyOptions {
  audience: string;
  issuer: string;
  subject: string;
  secretKey: string;
}
export interface IHelperJwtOptions extends IHelperJwtVerifyOptions {
  expiredIn: number | string;
  notBefore?: number | string;
}
