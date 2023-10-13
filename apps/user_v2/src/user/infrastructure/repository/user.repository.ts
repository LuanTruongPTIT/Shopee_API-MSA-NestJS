import { DatabaseMongoUUIDRepositoryAbstract } from '@libs/common/database_mongoose/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { UserDoc, UserEntity } from '../entity/user.entity';
import { Model } from 'mongoose';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserRepository extends DatabaseMongoUUIDRepositoryAbstract<
  UserEntity,
  UserDoc
> {
  constructor(
    @DatabaseModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
  ) {
    super(userModel);
  }
}
