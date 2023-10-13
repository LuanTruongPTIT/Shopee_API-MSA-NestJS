import { UserRepository } from '../../domain/userRepository';
import { UserEntity } from '../entity/user.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IDatabaseExistOptions } from '@libs/common/database_mongoose/interfaces/database.interface';
import { DATABASE_DELETED_AT_FIELD_NAME } from '@libs/common/database_mongoose/constants/database.constant';
import { IAuthPassword } from '../../interface/user.interface';
import { ConfigService } from '@nestjs/config';
import { HelperHashService } from '@libs/common/helper/services/helper.hash.service';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
// import {}
export class UserRepositoryImplement implements UserRepository {
  private readonly passwordSaltLength: number;
  private readonly passwordExpiredIn: number;
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
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

  async exist(
    find: Record<string, any>,
    options?: IDatabaseExistOptions,
  ): Promise<boolean> {
    if (options?.excludeId) {
      find = {
        ...find,
        _id: {
          $nin: options?.excludeId.map((val) => new Types.ObjectId(val)) ?? [],
        },
      };
    }
    const exist = this.userModel.exists(find);
    if (options?.withDeleted) {
      exist.or([
        {
          [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: false },
        },
        {
          [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: true },
        },
      ]);
    }
    const result = await exist;
    return !!result;
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
    const passwordHash = this.helperHashService.bcrypt(password, salt);
    return {
      salt,
      passwordHash,
      passwordExpired,
      passwordCreated,
    };
  }
}
