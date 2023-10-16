/* eslint-disable no-unneeded-ternary */
import { UserRepository } from '../../domain/userRepository';
import { UserEntity } from '../entity/user.entity';

import { IDatabaseExistOptions } from '@libs/common/database_mongoose/interfaces/database.interface';
import { DATABASE_DELETED_AT_FIELD_NAME } from '@libs/common/database_mongoose/constants/database.constant';
import { IAuthPassword } from '../../interface/user.interface';
import { ConfigService } from '@nestjs/config';
import { HelperHashService } from '@libs/common/helper/services/helper.hash.service';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { UserCreateDto } from '@libs/common/dto/users/user.create.dto';
import { Injectable } from '@nestjs/common';
import { ENUM_USER_SIGN_UP_FROM } from '../../constants/user.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { datasource } from '../repository/database/orm.config';
// import {}
// @Injectable()
export class UserRepositoryImplement implements UserRepository {
  private readonly passwordSaltLength: number;
  private readonly passwordExpiredIn: number;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly helperHashService: HelperHashService,
    private readonly helperDateService: HelperDateService,
  ) {
    this.passwordSaltLength = this.configService.get<number>(
      'auth.password.saltLength',
    );
    this.passwordExpiredIn = this.configService.get<number>(
      'auth.password.expiredIn',
    );
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
    const created = await datasource
      .getMongoRepository(UserEntity)
      .save([create]);
    return created[0];
  }
}
