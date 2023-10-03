import { AddCategoryProductRequestDTO } from '../interface/dto/addCategoryProductRequest.dto';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { Category } from './Category';
import { CategoryProductEntity } from '../infrastructure/entity/category.entity';
export interface CategoryRepository {
  save: (category: Category) => Promise<void>;
  findPrimaryCategory: (id: string) => Promise<CategoryProductEntity>;
  findAncestorCategory: (parents: string) => Promise<string[] | null>;
}
