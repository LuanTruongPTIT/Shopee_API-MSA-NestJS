import {
  AttributeCategoryValueDoc,
  AttributeCategoryValueEntity,
} from '../../infrastructure/read-model/schema/attribute-category-value.schema';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from '@libs/common/database_mongoose/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AttributeCategroyValueRepository extends DatabaseMongoUUIDRepositoryAbstract<
  AttributeCategoryValueEntity,
  AttributeCategoryValueDoc
> {
  constructor(
    @DatabaseModel(AttributeCategoryValueEntity.name)
    private attributeCategoryValueModel: Model<AttributeCategoryValueEntity>,
  ) {
    super(attributeCategoryValueModel);
  }
}
