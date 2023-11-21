import { DatabaseMongoUUIDRepositoryAbstract } from '@libs/common/database_mongoose/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import {
  CategoryDoc,
  CategoryEntity,
} from '../../infrastructure/read-model/schema/category.schema';
import { Model } from 'mongoose';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends DatabaseMongoUUIDRepositoryAbstract<
  CategoryEntity,
  CategoryDoc
> {
  constructor(
    @DatabaseModel(CategoryEntity.name)
    private categoryModel: Model<CategoryEntity>,
  ) {
    super(categoryModel);
  }
}
