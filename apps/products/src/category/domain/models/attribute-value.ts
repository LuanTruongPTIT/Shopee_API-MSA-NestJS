/* eslint-disable brace-style */
import { AttributeCategoryValueSerialization } from '@libs/common/serializations/product/attribute-category.value.serialization';
import { AggregateRoot } from '@nestjs/cqrs';
import { AttributeCategoryEvent } from '../event/create-attribute.event';

export type AttributeCategoryProperties = Readonly<
  Required<{
    _id: string;
    category_id: Array<string>;
    attribute_list: AttributeCategoryValueSerialization[];
  }>
>;
export interface AttributeCategory {
  create: () => void;
  commit: () => void;
}
export class AttributeCategoryImplement
  extends AggregateRoot
  implements AttributeCategory
{
  private readonly _id: string;
  private readonly category_id: Array<string>;
  private readonly attribute_list: AttributeCategoryValueSerialization[];

  constructor(properties: AttributeCategoryProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    this.apply(
      new AttributeCategoryEvent(
        this._id,
        this.category_id,
        this.attribute_list,
      ),
    );
  }
}
