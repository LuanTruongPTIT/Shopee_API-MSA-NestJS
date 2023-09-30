/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity } from 'typeorm';

import { BaseEntityDto } from '@libs/common/base/base-entity.dto';
import {
  IAttributes,
  Images,
  IDimension,
  IPrice_info,
} from '@libs/common/interfaces/product.interface';
import { Product_Variant } from './product.variants.entity';
import { Model } from './model.entity';
@Entity('product')
export class Product extends BaseEntityDto {
  constructor() {
    super();
  }

  @Column({
    type: 'string',
    nullable: false,
  })
  product_name: string;

  @Column({
    type: 'string',
  })
  description: string;

  @Column({
    type: 'array',
  })
  attributes: IAttributes[];

  @Column({
    type: 'array',
  })
  images: Images;

  @Column({
    type: 'number',
  })
  weight: number;

  @Column({})
  dimension: IDimension;

  @Column({
    default: 'true',
    type: 'boolean',
  })
  isDraft: boolean;

  @Column({
    nullable: false,
  })
  price_info: IPrice_info;

  @Column((type) => Product_Variant)
  product_variant_id: Product_Variant;

  @Column((type) => Model)
  model_id: Model;
}
