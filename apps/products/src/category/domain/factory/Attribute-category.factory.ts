import { AttributeCategoryValueSerialization } from '@libs/common/serializations/product/attribute-category.value.serialization';
import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  AttributeCategory,
  AttributeCategoryImplement,
} from '../models/attribute-value';
export type AttributeCategoryOptions = Readonly<
  Required<{
    _id: string;
    category_id: Array<string>;
    attribute_list: AttributeCategoryValueSerialization[];
  }>
>;
export class AttributeCategoryFactory {
  constructor(
    @Inject(EventPublisher)
    private readonly eventPublisher: EventPublisher,
  ) {}

  create(options: AttributeCategoryOptions): AttributeCategory {
    return this.eventPublisher.mergeObjectContext(
      new AttributeCategoryImplement(options),
    );
  }
}
