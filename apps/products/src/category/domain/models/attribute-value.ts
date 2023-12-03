/* eslint-disable brace-style */
import { AttributeCategoryValueSerialization } from '@libs/common/serializations/product/attribute-category.value.serialization';
import { AggregateRoot } from '@nestjs/cqrs';
import { AttributeCategoryEvent } from '../event/create-attribute.event';
import { CategoryAttributeDto } from '@libs/common/dto/product/attribute.category.dto';

export type AttributeCategoryProperties = Readonly<
  Required<{
    _id: string;
    category_id: string;
    attribute_list: CategoryAttributeDto[];
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
  private readonly category_id: string;
  private readonly attribute_list: CategoryAttributeDto[];

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
