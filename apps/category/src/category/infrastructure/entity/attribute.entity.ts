/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column } from 'typeorm';
import { BaseEntityDto } from '@libs/common/base/base-entity.dto';

import { Attribute_Value } from './attribute.value.entity';
@Entity('Attribute_Category')
export class Attribute extends BaseEntityDto {
  constructor() {
    super();
  }

  @Column({
    type: 'string',
    // unique: true,
  })
  original_attribute_name: string;

  @Column({
    type: 'string',
    // unique: true,
  })
  display_attribute_name: string;

  @Column({
    type: 'array',
  })
  value_unit: Array<string>;

  @Column({
    type: 'boolean',
  })
  is_mandatory: boolean;

  @Column((type) => Attribute_Value)
  attribue_value_list: Attribute_Value[];
}
