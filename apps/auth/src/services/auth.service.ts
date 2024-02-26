import { UserResponseKafkaSerialization } from '@libs/common/serializations/user.reponse.kafka.serialization';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../interfaces/auth.service.interface';
import { compareSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UserGetSerialization } from '@libs/common/serializations/user.get.serialization';
import { plainToInstance } from 'class-transformer';
import { UserPayloadSerialization } from '@libs/common/serializations/user.payload.serialization';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { HelperEncryptionService } from '@libs/common/helper/services/helper.encryption.service';
import { AuthAccessPayloadSerialization } from '@libs/common/serializations/auth/auth.access-payload.serialization';
import { IAuthPayloadOptions } from '@libs/common/interfaces/auth.interface';
import { AuthRefreshPayloadSerialization } from '@libs/common/serializations/auth/auth.refresh-payload.serialization';
import { TokenEntity } from '../database/entites/token.entites';
import { AuthRepository } from '../database/repositories/auth.repository';
import { UserPayloadAccessToken } from '@libs/common/serializations/user.payload.accesstoken';

@Injectable()
export class AuthService implements IAuthService {
  private readonly tokenType: string;
  private readonly accessTokenSecretKey: string;
  private readonly accessTokenExpired: number;
  private readonly accessTokenNotBeforeExpirationTime: number;

  private readonly refreshTokenSecretKey: string;
  private readonly refreshTokenExpirationTime: number;
  private readonly refreshTokenNotBeforeExpirationTime: number;

  private readonly audience: string;
  private readonly issuer: string;
  private readonly subject: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly helperDateService: HelperDateService,
    private readonly helperEncryptionService: HelperEncryptionService,
    private readonly authRepository: AuthRepository,
  ) {
    this.tokenType = this.configService.get<string>('auth.prefixAuthorization');
    this.accessTokenSecretKey = this.configService.get<string>(
      'auth.accessToken.secretKey',
    );
    this.accessTokenExpired = this.configService.get<number>(
      'auth.accessToken.expirationTime',
    );
    this.accessTokenNotBeforeExpirationTime = this.configService.get<number>(
      'auth.accessToken.notBeforeExpirationTime',
    );
    this.refreshTokenSecretKey = this.configService.get<string>(
      'auth.refreshToken.secretKey',
    );
    this.refreshTokenExpirationTime = this.configService.get<number>(
      'auth.refreshToken.expirationTime',
    );
    this.refreshTokenNotBeforeExpirationTime = this.configService.get<number>(
      'auth.refreshToken.notBeforeExpirationTime',
    );
    this.audience = this.configService.get<string>('auth.subject');
    this.issuer = this.configService.get<string>('auth.issuer');
    this.subject = this.configService.get<string>('auth.subject');
  }

  async validateUser(
    passwordString: string,
    passwordHashed: string,
  ): Promise<boolean> {
    return compareSync(passwordString, passwordHashed);
  }

  async payloadSerialization(
    data: UserResponseKafkaSerialization | Record<string, any>,
  ): Promise<UserPayloadSerialization> {
    return plainToInstance(UserPayloadSerialization, data);
  }

  async getTokenType(): Promise<string> {
    return this.tokenType;
  }

  async getLoginDate(): Promise<Date> {
    return this.helperDateService.create();
  }

  async createPayloadAccessToken(
    user: UserPayloadAccessToken,
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

  async createAccessToken(data: Record<string, any>): Promise<string> {
    console.log('this.accessTokenExpired', this.accessTokenExpired);
    return this.helperEncryptionService.jwtEncrypt(data, {
      secretKey: this.accessTokenSecretKey,
      expiredIn: this.accessTokenExpired,
      notBefore: this.accessTokenNotBeforeExpirationTime,
      audience: this.audience,
      subject: this.subject,
      issuer: this.issuer,
    });
  }

  async createRefreshToken(data: Record<string, any>): Promise<string> {
    return this.helperEncryptionService.jwtEncrypt(data, {
      secretKey: this.refreshTokenSecretKey,
      expiredIn: this.refreshTokenExpirationTime,
      notBefore: this.refreshTokenNotBeforeExpirationTime,
      audience: this.audience,
      subject: this.subject,
      issuer: this.issuer,
    });
  }

  async getAccessTokenExpirationTime(): Promise<number> {
    return this.accessTokenExpired;
  }

  async getRefreshTokenExpirationTime(): Promise<number> {
    return this.refreshTokenExpirationTime;
  }

  async create({
    refreshToken,
    userId,
  }: {
    refreshToken: string;
    userId: string;
  }): Promise<void> {
    const tokenEntity = new TokenEntity();
    tokenEntity.refreshToken = refreshToken;
    tokenEntity.userId = userId;
    await this.authRepository.create(tokenEntity);
  }
}
