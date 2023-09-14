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
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserDto)
    private readonly userRepo: Repository<UserDto>,
    private readonly jwtService: JwtService,
  ) {}

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
}
