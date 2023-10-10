import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { Category } from './Category';
import { CategoryProductEntity } from '../infrastructure/entity/category.entity';
import {
  AddAttributeCategoryRequestDto_v2,
  AttributeListID,
} from '../interface/dto/AddAttributCategory.v2.request.dto';
export interface CategoryRepository {
  save: (category: Category) => Promise<void>;
  findPrimaryCategory: (id: string) => Promise<CategoryProductEntity>;
  findAncestorCategory: (parents: string) => Promise<string[] | null>;
  // updateAttributeOfCategory: (
  //   data: AddAttributeCategoryRequestDto_v2,
  // ) => Promise<void>;
  updateAttributeOfCategory: (
    category_id: string,
    data: Array<string>,
  ) => Promise<void>;
}
