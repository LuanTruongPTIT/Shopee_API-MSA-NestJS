import { CategoryEntity } from 'apps/products/src/category/infrastructure/read-model/schema/category.schema';
import { GetCategoryResult } from './GetCategoryResult';

export interface CategoryQuery {
  getCategoryById: (id: string) => Promise<GetCategoryResult[]>;

  getAllCategory: () => Promise<GetCategoryResult[]>;
}
