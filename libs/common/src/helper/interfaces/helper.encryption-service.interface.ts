import { IHelperJwtOptions } from './helper.interface';

export interface IHelperEncryptionService {
  jwtEncrypt(payload: Record<string, any>, options: IHelperJwtOptions): string;
}
