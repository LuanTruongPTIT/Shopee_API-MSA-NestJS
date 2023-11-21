import { CategoryChildrenSerialization } from '@libs/common/serializations/product/category.children.serialization';
import { AddCategoryEvent } from './create-category.event';

export const categoryEventHandlers = {
  CategoryCreated: (
    _id: string,
    category_name: string,
    isParent: boolean,
    subscategories: CategoryChildrenSerialization[],
  ) => new AddCategoryEvent(_id, category_name, isParent, subscategories),
};
