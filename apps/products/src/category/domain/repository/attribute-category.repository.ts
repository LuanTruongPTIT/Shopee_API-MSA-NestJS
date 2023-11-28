import { DatabaseMongoUUIDRepositoryAbstract } from '@libs/common/database_mongoose/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';

import { Model } from 'mongoose';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
import { Injectable } from '@nestjs/common';
import {
  AttributeCategoryDoc,
  AttributeCategoryEntity,
} from '../../infrastructure/read-model/schema/attribute-category.schema';

@Injectable()
export class AttributeCategoryRepository extends DatabaseMongoUUIDRepositoryAbstract<
  AttributeCategoryEntity,
  AttributeCategoryDoc
> {
  constructor(
    @DatabaseModel(AttributeCategoryEntity.name)
    private categoryModel: Model<AttributeCategoryEntity>,
  ) {
    super(categoryModel);
  }
}
