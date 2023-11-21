import { CategoryChildrenSerialization } from '@libs/common/serializations/product/category.children.serialization';
import { ICommand } from '@nestjs/cqrs';
export class CreateCategoryCommand implements ICommand {
  constructor(
    public readonly _id: string,
    public readonly category_name: string,
    public readonly isParent: boolean,
    public readonly subscategories: CategoryChildrenSerialization[],
  ) {}
}
