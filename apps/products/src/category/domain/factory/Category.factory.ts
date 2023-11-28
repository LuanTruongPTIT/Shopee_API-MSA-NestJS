import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Category, CategoryImplement } from '../models/category';
import { EventStore } from '@libs/common/core/eventstore/eventstore';
import { CategoryChildrenSerialization } from '@libs/common/serializations/product/category.children.serialization';
import { CATEGORY_PRODUCT_LEVEL } from '@libs/common/constants/category.enum';
type CreateCategoryOptions = Readonly<{
  _id: string;
  category_name: string;
  isParent: boolean;
  parent_id?: Array<string> | '';
  level?: CATEGORY_PRODUCT_LEVEL;
  isActive: boolean;
  file: string;
  parent: string;
  // subscategories: CategoryChildrenSerialization[];
}>;
@Injectable()
export class CategoryFactory {
  constructor(
    private readonly eventStore: EventStore,
    @Inject(EventPublisher)
    private readonly eventPublisher: EventPublisher,
  ) {}

  create(options: CreateCategoryOptions): Category {
    return this.eventPublisher.mergeObjectContext(
      new CategoryImplement(options),
    );
  }
}
