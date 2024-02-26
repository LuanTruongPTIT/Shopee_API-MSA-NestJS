import { DatabaseMongoUUIDRepositoryAbstract } from '@libs/common/database_mongoose/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { ApiKeyDoc, ApiKeyEntity } from '../entites/api-key.entites';
import { Model } from 'mongoose';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyRepository extends DatabaseMongoUUIDRepositoryAbstract<
  ApiKeyEntity,
  ApiKeyDoc
> {
  constructor(
    @DatabaseModel(ApiKeyEntity.name)
    private readonly apiKeyModel: Model<ApiKeyEntity>,
  ) {
    super(apiKeyModel);
  }
}
