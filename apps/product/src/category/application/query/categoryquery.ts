import { CategoryDoc } from '../../infrastructure/read-model/schema/category.schema';

export interface CategoryQuery {
  getAllCategory: () => Promise<Array<any>>;

  getCategoryChildByPrimary: (
    field: string,
    category_parent_id: string,
  ) => Promise<CategoryDoc[]>;
}
