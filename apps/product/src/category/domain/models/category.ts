import { CategoryChildrenSerialization } from '@libs/common/serializations/product/category.children.serialization';
import { AggregateRoot } from '@nestjs/cqrs';
import { AddCategoryEvent } from '../event/create-category.event';
import { CATEGORY_PRODUCT_LEVEL } from '@libs/common/constants/category.enum';

export interface Category {
  create: () => void;
}
export type CategoryEssentialProperties = Readonly<
  Required<{
    _id: string;
    category_name: string;
    isParent: boolean;
    isActive: boolean;
    file: string;
    // subscategories: CategoryChildrenSerialization[];
  }>
>;

export type CategoryOptionalProperties = Readonly<
  Partial<{
    category_parent_id: Array<string>;
    level: CATEGORY_PRODUCT_LEVEL;
    parent: string | null;
  }>
>;
type CategoryProperties = CategoryEssentialProperties &
  CategoryOptionalProperties;
export interface Category {
  create: () => void;
  commit: () => void;
}
export class CategoryImplement extends AggregateRoot implements Category {
  private readonly _id: string;
  private readonly category_name: string;
  private readonly isParent: boolean;
  private readonly parent_id?: Array<string>;
  private readonly level?: CATEGORY_PRODUCT_LEVEL;
  private readonly isActive: boolean;
  private readonly file: string;
  public readonly parent?: string | null;
  // private readonly subscategories: CategoryChildrenSerialization[];

  constructor(properties: CategoryProperties) {
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
        this.parent_id,
        this.level,
        this.file,
        this.isActive,
        this.parent,
        // this.subscategories,
      ),
    );
  }
}
