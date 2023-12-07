import { CATEGORY_PRODUCT_LEVEL } from '@libs/common/constants/category.enum';
import { CategoryChildrenSerialization } from '@libs/common/serializations/product/category.children.serialization';
import { IEvent } from '@nestjs/cqrs';

export class AddCategoryEvent implements IEvent {
  constructor(
    public readonly _id: string,
    public readonly category_name: string,
    public readonly isParent: boolean,
    public readonly parent_id?: Array<string> | null,
    public readonly level?: CATEGORY_PRODUCT_LEVEL, // private readonly subscategories: CategoryChildrenSerialization[],
    public readonly file?: string,
    public readonly isActive?: boolean,
    public readonly parent?: string | null
  ) {}
}
