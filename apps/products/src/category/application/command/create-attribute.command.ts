import { AttributeCategoryValueSerialization } from '@libs/common/serializations/product/attribute-category.value.serialization';
import { ICommand } from '@nestjs/cqrs';

export class CreateAttributeCategoryCommand implements ICommand {
  constructor(
    public readonly _id: string,
    public readonly category_id: Array<string>,
    public readonly attribute_list: AttributeCategoryValueSerialization[],
  ) {}
}
