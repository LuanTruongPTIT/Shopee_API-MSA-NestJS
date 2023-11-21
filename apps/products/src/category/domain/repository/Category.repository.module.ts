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

@Module({
  providers: [CategoryRepository],
  exports: [CategoryRepository],
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
