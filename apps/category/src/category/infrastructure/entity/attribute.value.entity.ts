import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('Attribute_value')
export class Attribute_Value {
  @ObjectIdColumn()
  _id: string;

  @Column({
    type: 'string',
    // unique: true,
  })
  @Column({
    type: 'string',
  })
  original_value_name: string;

  @Column({
    type: 'string',
  })
  display_value_name: string;

  @Column({
    type: 'string',
  })
  value_unit: string;
}
