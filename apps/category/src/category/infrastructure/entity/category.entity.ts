/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

// import { Attribute } from './attribute.entity';
// import { Product } from './product.entity';
import { BaseEntityDto } from '@libs/common/base/base-entity.dto';
@Entity('Category_Product')
export class CategoryProductEntity {
  constructor(
    _id: string,
    ancestors: Array<string>,
    parents: Array<string>,
    name: string,
    is_primary: boolean,
    description: string,
    // attribute_id: Attribute[],
    is_product_listing_enabled: boolean,
    no_license_Seller_enabled: boolean,
    image: string[],
    // product_id: Product[],
  ) {
    this._id = _id;
    this.ancestors = ancestors;
    this.parents = parents;
    this.name = name;
    // this.is_primary = is_primary;
    this.description = description;
    // this.attribute_id = attribute_id;
    this.is_product_listing_enabled = is_product_listing_enabled;
    this.no_license_Seller_enabled = no_license_Seller_enabled;
    this.image = image;
    // this.product_id = product_id;
  }

  @ObjectIdColumn()
  _id: string;

  @Column({
    type: 'array',
  })
  ancestors: Array<string>;

  @Column({
    type: 'array',
  })
  parents: Array<string>;

  @Column({
    type: 'string',
  })
  name: string;

  @Column({
    type: 'boolean',
  })
  is_primary: boolean;

  @Column({
    type: 'string',
  })
  description: string;

  // @Column((type) => Attribute)
  // attribute_id: Attribute[];

  @Column({
    type: 'boolean',
  })
  is_product_listing_enabled: boolean;

  @Column({
    type: 'boolean',
  })
  no_license_Seller_enabled: boolean;

  @Column({
    type: 'array',
  })
  image: Array<string>;

  // @Column((type) => Product)
  // product_id: Product[];

  // @CreateDateColumn({
  //   name: 'createdDate',
  // })
  // createdDate: Date;

  // @UpdateDateColumn({
  //   name: 'updatedDate',
  // })
  // updatedDate: Date;
}
