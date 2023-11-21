import { CategoryChildrenSerialization } from '@libs/common/serializations/product/category.children.serialization';
import { AggregateRoot } from '@nestjs/cqrs';
import { AddCategoryEvent } from '../event/create-category.event';

export interface Category {
  create: () => void;
}
export type CategoryEssentialProperties = Readonly<
  Required<{
    _id: string;
    category_name: string;
    isParent: boolean;
    subscategories: CategoryChildrenSerialization[];
  }>
>;
export interface Category {
  create: () => void;
  commit: () => void;
}
export class CategoryImplement extends AggregateRoot implements Category {
  private readonly _id: string;
  private readonly category_name: string;
  private readonly isParent: boolean;
  private readonly subscategories: CategoryChildrenSerialization[];

  constructor(properties: CategoryEssentialProperties) {
    super();
    Object.assign(this, properties);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // setData() {}
  create(): void {
    this.apply(
      new AddCategoryEvent(
        this._id,
        this.category_name,
        this.isParent,
        this.subscategories,
      ),
    );
  }
}
