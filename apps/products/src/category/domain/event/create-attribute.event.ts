import { AttributeCategoryValueSerialization } from '@libs/common/serializations/product/attribute-category.value.serialization';
import { IEvent } from '@nestjs/cqrs';

export class AttributeCategoryEvent implements IEvent {
  constructor(
    public readonly _id: string,
    public readonly category_id: Array<string>,
    public readonly attribute_list: AttributeCategoryValueSerialization[],
  ) {}
}
