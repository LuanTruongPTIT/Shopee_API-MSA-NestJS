import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoryEntity,
  CatergorySchema,
} from '../../infrastructure/read-model/schema/category.schema';
import {
  AttributeCategoryEntity,
  AttributeCateogrySchema,
} from '../../infrastructure/read-model/schema/attribute-category.schema';
import { CategoryRepository } from './Category.repository';
import { AttributeCategoryRepository } from './attribute-category.repository';
import {
  AttributeCategoryValueEntity,
  AttributeCategoryValueSchema,
} from '../../infrastructure/read-model/schema/attribute-category-value.schema';
import { AttributeCategroyValueRepository } from './attribute-value-category.repository';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Module({
  providers: [
    CategoryRepository,
    AttributeCategoryRepository,
    AttributeCategroyValueRepository,
  ],
  exports: [
    CategoryRepository,
    AttributeCategoryRepository,
    AttributeCategroyValueRepository,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: CategoryEntity.name,
        schema: CatergorySchema,
      },
      {
        name: AttributeCategoryEntity.name,
        schema: AttributeCateogrySchema,
      },
      {
        name: AttributeCategoryValueEntity.name,
        schema: AttributeCategoryValueSchema,
      },
    ]),
  ],
})
export class CategoryRepositoryModule implements OnModuleInit {
  constructor(
    @DatabaseModel(CategoryEntity.name)
    private categoryModel: Model<CategoryEntity>,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  onModuleInit() {
    this.categoryModel.collection.watch<CategoryEntity>().on('change', (e) => {
      console.log(e);
      this.cache.del('/api/v1/product');
    });
  }
}
