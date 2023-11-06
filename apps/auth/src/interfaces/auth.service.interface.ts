import { IAuthPayloadOptions } from '@libs/common/interfaces/auth.interface';
import { AuthAccessPayloadSerialization } from '@libs/common/serializations/auth.access-payload.serialization';
import { AuthRefreshPayloadSerialization } from '@libs/common/serializations/auth.refresh-payload.serialization';
import { UserPayloadSerialization } from '@libs/common/serializations/user.payload.serialization';
import { UserResponseKafkaSerialization } from '@libs/common/serializations/user.reponse.kafka.serialization';
import { TokenEntity } from '../database/entites/token.entites';

export const IAuthService = Symbol.for('IAuthService');
export interface IAuthService {
  validateUser: (
    passwordString: string,
    passwordHashed: string,
  ) => Promise<boolean>;
  payloadSerialization: (
    data: UserResponseKafkaSerialization,
  ) => Promise<UserPayloadSerialization>;
  getTokenType: () => Promise<string>;
  getLoginDate: () => Promise<Date>;
  createPayloadAccessToken: (
    user: Record<string, any>,
    { loginWith, loginFrom, loginDate }: IAuthPayloadOptions,
  ) => Promise<AuthAccessPayloadSerialization>;
  createPayloadRefreshToken: (
    _id: string,
    { loginWith, loginFrom, loginDate }: IAuthPayloadOptions,
  ) => Promise<AuthRefreshPayloadSerialization>;
  createAccessToken: (data: Record<string, any>) => Promise<string>;
  createRefreshToken: (data: Record<string, any>) => Promise<string>;
  getAccessTokenExpirationTime: () => Promise<number>;
  create: ({
    refreshToken,
    userId,
  }: {
    refreshToken: string;
    userId: string;
  }) => Promise<void>;
}
