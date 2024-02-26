import { DatabaseMongoUUIDRepositoryAbstract } from '@libs/common/database_mongoose/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { TokenDoc, TokenEntity } from '../entites/token.entites';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
@Injectable()
export class AuthRepository extends DatabaseMongoUUIDRepositoryAbstract<
  TokenEntity,
  TokenDoc
> {
  constructor(
    @DatabaseModel(TokenEntity.name)
    private readonly tokenModel: Model<TokenEntity>,
  ) {
    super(tokenModel);
  }
}
