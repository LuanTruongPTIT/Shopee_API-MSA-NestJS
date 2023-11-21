import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Category, CategoryImplement } from '../models/category';
import { EventStore } from '@libs/common/core/eventstore/eventstore';
import { CategoryChildrenSerialization } from '@libs/common/serializations/product/category.children.serialization';
type CreateCategoryOptions = Readonly<{
  _id: string;
  category_name: string;
  isParent: boolean;
  subscategories: CategoryChildrenSerialization[];
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
