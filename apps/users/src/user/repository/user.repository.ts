import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';
import { Injectable } from '@nestjs/common';
import { User } from '../models/users.models';
import { UserDto } from '../database/entities/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenType, UserVerifyStatus } from '../constants/user.enum.constant';
import { envConfig } from '../config/config';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { compareSync } from 'bcryptjs';
import { RedisService } from 'libs/redis/src/redis.service';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { HelperHashService } from '@libs/common/helper/services/helper.hash.service';
import { IAuthPassword } from '@libs/common/interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcryptjs';
@Injectable()
export class UserRepository {
  private readonly passwordSaltLength: number;
  private readonly passwordExpiredIn: number;
  constructor(
    @InjectRepository(UserDto)
    private readonly userRepo: Repository<UserDto>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly helperDateService: HelperDateService,
    private readonly helperHashService: HelperHashService,
    private readonly configService: ConfigService,
  ) {
    this.passwordSaltLength = parseInt(
      this.configService.get<string>('AUTH_PASSWORD_SALT_LENGTH'),
    );
    this.passwordExpiredIn = this.configService.get<number>(
      'AUTH_PASSWORD_EXPIREDIN',
    );
  }

  async createUser(streamId: string, userDto: UserDto) {
    const user = new User(streamId);
    user.setData(userDto);
    user.createUser(streamId);
    return user;
  }

  async signInEvent(
    streamId: string,
    userLoginDto: UserLoginDto,
    iResponse: IResponse,
  ) {
    const user = new User(streamId);
    user.setData(iResponse);
    user.signin(streamId, userLoginDto);
    return user;
  }

  async existByMobileNumber(phoneNumber: string): Promise<UserDto> {
    return this.userRepo.findOne({
      where: { phone_number: phoneNumber },
      withDeleted: true,
    });
  }

  async existEmail(email: string): Promise<UserDto> {
    return this.userRepo.findOne({ where: { email } });
  }

  async signAccessToken({
    userId,
    verify,
  }: {
    userId: string;
    verify: UserVerifyStatus;
  }) {
    const payload = {
      userId,
      tokenType: TokenType.AccessToken,
      verify,
    };
    return this.jwtService.sign(payload, {
      privateKey: envConfig.jwtSecretAccessToken,
      expiresIn: parseInt(envConfig.accessTokenExpiresIn),
    });
  }

  async signRefreshToken({
    userId,
    verify,
    exp,
  }: {
    userId: string;
    verify: UserVerifyStatus;
    exp?: number;
  }) {
    if (exp) {
      return this.jwtService.sign(
        {
          userId,
          tokenType: TokenType.RefreshToken,
          verify,
          exp,
        },
        {
          secret: envConfig.jwtSecretRefreshToken,
        },
      );
    } else {
      const payload = {
        userId,
        tokenType: TokenType.RefreshToken,
        verify,
      };
      return this.jwtService.sign(payload, {
        secret: envConfig.jwtSecretRefreshToken,
        expiresIn: parseInt(envConfig.refreshTokenExpiresIn),
      });
    }
  }

  signAccessAndRefreshToken({
    userId,
    verify,
  }: {
    userId: string;
    verify: UserVerifyStatus;
  }) {
    return Promise.all([
      this.signAccessToken({ userId, verify }),
      this.signRefreshToken({ userId, verify }),
    ]);
  }

  decodeRefreshToken(refreshToken: string) {
    return this.jwtService.verifyAsync(refreshToken, {
      secret: envConfig.jwtSecretRefreshToken,
    });
  }

  checkPassword(password: string, hashPassword: string): boolean {
    return this.helperHashService.bcryptCompare(password, hashPassword);
  }

  async checkNumberFailLogin({
    key,
    numberFailLogin,
  }: {
    key: string;
    numberFailLogin: number;
  }) {
    console.log('Key', key);
    const result = await this.redisService.get(key);
    if (!result) {
      await this.redisService.set(key, numberFailLogin, 100);
    } else {
      await this.redisService.set(key, numberFailLogin, 100);
    }
  }

  createSalt(length: number): string {
    return this.helperHashService.randomSalt(length);
  }

  async createPassword(password: string): Promise<IAuthPassword> {
    const salt: string = this.createSalt(this.passwordSaltLength);
    const passwordExpired: Date = this.helperDateService.forwardInSeconds(
      this.passwordExpiredIn,
    );
    const passwordCreated: Date = this.helperDateService.create();
    const passwordHash = this.helperHashService.bcrypt(password, salt);

    return {
      passwordHash,
      passwordExpired,
      passwordCreated,
      salt,
    };
  }

  async checkPasswordExpired(passwordExpired: Date): Promise<boolean> {
    const toDate = this.helperDateService.create();
    const passwordExpiredConvert: Date =
      this.helperDateService.create(passwordExpired);
    return toDate > passwordExpiredConvert;
  }
}
