/* eslint-disable brace-style */
import { AggregateRoot } from '@nestjs/cqrs';
// import { Attribute } from '../infrastructure/entity/attribute.entity';
// import { Product } from '../infrastructure/entity/product.entity';
import { AddCategoryEvent } from './event/AddCategoryEvent';

export type CategoryEssentialProperties = Readonly<
  Required<{
    _id: string;
    ancestors: Array<string>;
    parents: string;
    name: string;
    is_primary: boolean;
    image: string[];
  }>
>;

export type CategoryOptionalProperties = Readonly<{
  description: string;
  is_product_listing_enabled: boolean;
  no_license_Seller_enabled: boolean;
  // attribute_id: Attribute[];
  // product_id: Product[];
}>;
export type CategoryProperties = CategoryEssentialProperties &
  CategoryOptionalProperties;
export interface Category {
  add: (_id: string, categoryProperties: CategoryProperties) => void;
  commit: () => void;
}
export class CategoryProductImplement
  extends AggregateRoot
  implements Category
{
  private readonly _id: string;
  private ancestors: Array<string>;
  private parents: string;
  private name: string;
  private is_primary: boolean;
  private image: string[];
  private description?: string;
  private is_product_listing_enabled?: true;
  private no_license_seller_enabled?: true;
  // private attribute_id?: Attribute[];
  // private product_id?: Product[];

  constructor(properties: CategoryProperties) {
    super();
    Object.assign(this, properties);
  }

  add(_id: string, categoryProperties: CategoryProperties): void {
    this.apply(new AddCategoryEvent(_id, categoryProperties));
  }
}
