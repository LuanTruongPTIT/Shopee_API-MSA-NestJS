import { IAuthPassword } from '../interface/user.interface';
import { UserCreateDto } from '@libs/common/dto/users/user.create.dto';
import { UserEntity } from '../infrastructure/entity/user.entity';
import { UserVerifyStatus } from '../constants/user.enum';
import { EntityTarget } from 'typeorm';
import { TokenDto } from '@libs/common/dto/users/token.dto';
import { RefreshTokenEntity } from '../infrastructure/entity/token.entity';
export interface UserRepository {
  exist: (data: Record<string, any>) => Promise<boolean>;
  createPassword: (password: string) => Promise<IAuthPassword>;
  createSalt: (length: number) => Promise<string>;
  save: (data: TokenDto) => Promise<void>;
  create: (
    {
      firstName,
      lastName,
      email,
      mobileNumber,
      role,
      signUpFrom,
      _id,
      verify,
      email_verify_token,
    }: UserCreateDto,
    { passwordExpired, passwordHash, salt, passwordCreated }: IAuthPassword,
  ) => Promise<UserEntity>;
  signEmailVerifyToken: ({
    _id,
    verify,
  }: {
    _id: string;
    verify: UserVerifyStatus;
  }) => Promise<string>;
  verifyEmail: (id: string) => Promise<void>;
  findUser: (data: Record<string, any>) => Promise<UserEntity>;
  validateUser: (
    passwordString: string,
    passwordHashed: string,
  ) => Promise<boolean>;
  increasePasswordAttempt: (repository: UserEntity) => Promise<void>;
  resetPasswordAttempt: (repository: UserEntity) => Promise<void>;
  createAccessToken: (data: Record<string, any>) => Promise<string>;
  createRefreshToken: (data: Record<string, any>) => Promise<string>;
}
