/* eslint-disable no-unneeded-ternary */
import { UserRepository } from '../../domain/userRepository';
import { UserEntity } from '../entity/user.entity';
import { IAuthPassword } from '../../interface/user.interface';
import { ConfigService } from '@nestjs/config';
import { HelperHashService } from '@libs/common/helper/services/helper.hash.service';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { UserCreateDto } from '@libs/common/dto/users/user.create.dto';
import { Injectable } from '@nestjs/common';
import { UserVerifyStatus } from '../../constants/user.enum';
import { datasource } from './database/orm.config';
import { HelperEncryptionService } from '@libs/common/helper/services/helper.encryption.service';
import { ObjectId, Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';
import { RefreshTokenEntity } from '../entity/token.entity';
import { TokenDto } from '@libs/common/dto/users/token.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import {}
@Injectable()
export class UserRepositoryImplement implements UserRepository {
  private readonly passwordSaltLength: number;
  private readonly passwordExpiredIn: number;

  private readonly tokenEmailSecretKey: string;
  private readonly tokenEmailExpirationTime: number;
  private readonly tokenEmailNotBeforeExpirationTime: number;

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
    private readonly helperHashService: HelperHashService,
    private readonly helperDateService: HelperDateService,
    private readonly helperEncryptionService: HelperEncryptionService, // @InjectRepository(RefreshTokenEntity) // private readonly tokenEntity: Repository<RefreshTokenEntity>,
  ) {
    this.passwordSaltLength = this.configService.get<number>(
      'auth.password.saltLength',
    );
    this.passwordExpiredIn = this.configService.get<number>(
      'auth.password.expiredIn',
    );
    this.tokenEmailSecretKey = this.configService.get<string>(
      'auth.tokenEmail.tokenEmailSecretKey',
    );
    this.tokenEmailExpirationTime = this.configService.get<number>(
      'auth.tokenEmail.tokenEmailExpirationTime',
    );
    this.tokenEmailNotBeforeExpirationTime = this.configService.get<number>(
      'auth.tokenEmail.tokenEmailNotBeforeExpirationTime',
    );
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

  async exist(find: Record<string, any>): Promise<boolean> {
    const exist = await datasource
      .getMongoRepository(UserEntity)
      .findOne({ where: find });
    console.log(exist);
    return exist === null ? false : true;
  }

  async createSalt(length: number): Promise<string> {
    return this.helperHashService.randomSalt(length);
  }

  async createPassword(password: string): Promise<IAuthPassword> {
    const salt: string = await this.createSalt(this.passwordSaltLength);
    const passwordExpired = this.helperDateService.forwardInSeconds(
      this.passwordExpiredIn,
    );
    const passwordCreated = this.helperDateService.create();
    console.log(password, salt);
    const passwordHash = this.helperHashService.bcrypt(password, salt);
    return {
      salt,
      passwordHash,
      passwordExpired,
      passwordCreated,
    };
  }

  async create(
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
  ): Promise<UserEntity> {
    const create: UserEntity = new UserEntity();

    create.firstName = firstName;
    create.lastName = lastName;
    create.email = email;
    create.mobileNumber = mobileNumber;
    create.role = role;
    create.signUpFrom = signUpFrom;
    create.blocked = false;
    create.isActive = false;
    create.salt = salt;
    create.passwordExpired = passwordExpired;
    create.password = passwordHash;
    create.passwordCreated = passwordCreated;
    create.signUpDate = this.helperDateService.create();
    create.passwordAttempt = 0;
    create._id = _id;
    create.email_verify_token = email_verify_token;
    create.verify = verify;
    const created = await datasource
      .getMongoRepository(UserEntity)
      .save([create]);
    return created[0];
  }

  async signEmailVerifyToken({
    _id,
    verify,
  }: {
    _id: string;
    verify: UserVerifyStatus;
  }): Promise<string> {
    return this.helperEncryptionService.jwtEncrypt(
      { user: { _id, verify } },
      {
        secretKey: this.tokenEmailSecretKey,
        expiredIn: this.tokenEmailExpirationTime,
        notBefore: this.tokenEmailNotBeforeExpirationTime,
        audience: this.audience,
        subject: this.subject,
        issuer: this.issuer,
      },
    );
  }

  async verifyEmail(id: string): Promise<void> {
    console.log('id la', id);
    const result = await datasource.getMongoRepository(UserEntity).updateOne(
      { _id: id },
      {
        $set: {
          email_verify_token: '',
          isActive: true,
          verify: UserVerifyStatus.Verified,
          updated: '$$NOW',
        },
      },
    );
    console.log(result);
  }

  async findUser(data: Record<string, any>): Promise<UserEntity> {
    console.log('tim thay user chua');
    const result = await datasource
      .getMongoRepository(UserEntity)
      .findOneByOrFail({ where: data });
    console.log(result);
    return result;
  }

  async validateUser(
    passwordString: string,
    passwordHashed: string,
  ): Promise<boolean> {
    console.log(passwordString, passwordHashed);
    return compareSync(passwordString, passwordHashed);
  }

  async increasePasswordAttempt(repository: UserEntity): Promise<void> {
    repository.passwordAttempt = ++repository.passwordAttempt;
    await datasource.getMongoRepository(UserEntity).updateOne(
      {
        _id: repository._id,
      },
      {
        $set: {
          passwordAttempt: repository.passwordAttempt,
        },
      },
    );
  }

  async resetPasswordAttempt(repository: UserEntity): Promise<void> {
    console.log('reset password');
    await datasource.getMongoRepository(UserEntity).updateOne(
      { _id: repository._id },
      {
        $set: {
          passwordAttempt: 0,
        },
      },
    );
  }

  async createAccessToken(data: Record<string, any>): Promise<string> {
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

  async save(data: TokenDto): Promise<void> {
    console.log(data);
    const entity: RefreshTokenEntity = new RefreshTokenEntity();
    entity.refreshToken = data.RefreshToken;
    entity.userId = data.UserId;
    await datasource.getMongoRepository(RefreshTokenEntity).save([entity]);
    // await this.tokenEntity.save(entity);
  }
}
