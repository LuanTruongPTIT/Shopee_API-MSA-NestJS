import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Category, CategoryProductImplement } from './Category';
import { Attribute } from '../infrastructure/entity/attribute.entity';
// import { Attribute } from '../infrastructure/entity/attribute.entity';
// import { Product } from '../infrastructure/entity/product.entity';
type AddCategoryOptions = Readonly<{
  _id: string;
  ancestors: Array<string>;
  parents: string;
  name: string;
  is_primary: boolean;
  image: string[];
  description: string;
  is_product_listing_enabled: boolean;
  no_license_Seller_enabled: boolean;
  attribute_id: Attribute['_id'];
  // product_id: Product[];
}>;
export class CategoryFactory {
  @Inject(EventPublisher)
  private readonly eventPublisher: EventPublisher;

  create(options: AddCategoryOptions): Category {
    return this.eventPublisher.mergeObjectContext(
      new CategoryProductImplement({
        ...options,
      }),
    );
  }
}
