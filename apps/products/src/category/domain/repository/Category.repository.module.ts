import { Module } from '@nestjs/common';
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

@Module({
  providers: [CategoryRepository, AttributeCategoryRepository],
  exports: [CategoryRepository, AttributeCategoryRepository],
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
    ]),
  ],
})
export class CategoryRepositoryModule {}
