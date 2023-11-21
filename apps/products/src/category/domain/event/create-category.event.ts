import { CategoryChildrenSerialization } from '@libs/common/serializations/product/category.children.serialization';
import { IEvent } from '@nestjs/cqrs';

export class AddCategoryEvent implements IEvent {
  constructor(
    public readonly _id: string,
    public readonly category_name: string,
    public readonly isParent: boolean,
    private readonly subscategories: CategoryChildrenSerialization[],
  ) {}
}
