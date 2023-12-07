import { CategoryChildrenSerialization } from '@libs/common/serializations/product/category.children.serialization';
import { AddCategoryEvent } from './create-category.event';
import { CATEGORY_PRODUCT_LEVEL } from '@libs/common/constants/category.enum';

export const categoryEventHandlers = {
  CategoryCreated: (
    _id: string,
    category_name: string,
    isParent: boolean,
    parent_id: Array<string>,
    level: CATEGORY_PRODUCT_LEVEL,
    isActive: boolean,
    file: string,
    parent: string | null,
    // subscategories: CategoryChildrenSerialization[],
  ) =>
    new AddCategoryEvent(
      _id,
      category_name,
      isParent,
      parent_id,
      level,
      file,
      isActive,
      parent,
    ),
};
