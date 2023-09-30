import { BaseEntityDto } from '@libs/common/base/base-entity.dto';
import { Column, Entity } from 'typeorm';
import { Variation } from '@libs/common/interfaces/product.interface';
import { Product } from './product.entity';
@Entity('product_variant')
export class Product_Variant extends BaseEntityDto {
  constructor() {
    super();
  }

  @Column({})
  tier_variation: Variation;
}
