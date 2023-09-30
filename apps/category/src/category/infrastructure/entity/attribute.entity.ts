// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Entity, Column } from 'typeorm';
// import { BaseEntityDto } from '@libs/common/base/base-entity.dto';

// import { Attribute_Value } from './attribute.value.entity';
// @Entity('Attribute_Product')
// export class Attribute extends BaseEntityDto {
//   constructor() {
//     super();
//   }

//   @Column({
//     type: 'string',
//     // unique: true,
//   })
//   original_attribute_name: string;

//   @Column({
//     type: 'string',
//     // unique: true,
//   })
//   display_attribute_name: string;

//   @Column({
//     type: 'string',
//   })
//   input_validation_type: string;

//   @Column({
//     type: 'string',
//   })
//   value_unit: string;

//   @Column({
//     type: 'string',
//   })
//   format_type: string;

//   @Column({
//     type: 'string',
//   })
//   data_type: string;

//   @Column((type) => Attribute_Value)
//   attribue_value_id: Attribute_Value[];
// }
