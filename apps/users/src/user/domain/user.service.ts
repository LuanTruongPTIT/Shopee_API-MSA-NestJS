import { UserPayloadSerialization } from '@libs/common/serializations/user.payload.serialization';
import { UserEntity } from '../infrastructure/entity/user.entity';
import { plainToInstance } from 'class-transformer';
import { IAuthPayloadOptions } from '@libs/common/interfaces/auth.interface';
import { AuthAccessPayloadSerialization } from '@libs/common/serializations/auth.access-payload.serialization';
import { AuthRefreshPayloadSerialization } from '@libs/common/serializations/auth.refresh-payload.serialization';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
@Injectable()
export class UserService {
  private readonly tokenType: string;
  private readonly accessTokenExpired: number;
  constructor(
    private readonly configService: ConfigService,
    private readonly helperDateService: HelperDateService,
  ) {
    this.tokenType = this.configService.get<string>(
      'auth. prefixAuthorization:',
    );
    this.accessTokenExpired = this.configService.get<number>(
      'auth.accessToken.expirationTime',
    );
  }

  async payloadSerialization(
    data: UserEntity,
  ): Promise<UserPayloadSerialization> {
    return plainToInstance(UserPayloadSerialization, data);
  }

  async createPayloadAccessToken(
    user: Record<string, any>,
    { loginWith, loginFrom, loginDate }: IAuthPayloadOptions,
  ): Promise<AuthAccessPayloadSerialization> {
    return {
      user,
      loginWith,
      loginFrom,
      loginDate,
    };
  }

  async createPayloadRefreshToken(
    _id: string,
    { loginWith, loginFrom, loginDate }: IAuthPayloadOptions,
  ): Promise<AuthRefreshPayloadSerialization> {
    return {
      user: { _id },
      loginWith,
      loginFrom,
      loginDate,
    };
  }

  async getTokenType(): Promise<string> {
    return this.tokenType;
  }

  async getLoginDate(): Promise<Date> {
    return this.helperDateService.create();
  }

  async getAccessTokenExpirationTime(): Promise<number> {
    return this.accessTokenExpired;
  }
}
