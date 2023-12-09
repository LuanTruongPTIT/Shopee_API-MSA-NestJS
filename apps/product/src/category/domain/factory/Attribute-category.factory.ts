import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  AttributeCategory,
  AttributeCategoryImplement,
} from '../models/attribute-value';
import { CategoryAttributeDto } from '@libs/common/dto/product/attribute.category.dto';
export type AttributeCategoryOptions = Readonly<
  Required<{
    _id: string;
    category_id: string;
    attribute_list: CategoryAttributeDto[];
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
