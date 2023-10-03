import { GetCategoryResult } from './GetCategoryResult';

export interface CategoryQuery {
  getCategoryById: (id: string) => Promise<GetCategoryResult[]>;

  getAllCategory: () => Promise<GetCategoryResult[]>;
}
