import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'attribute_category_value_entity' })
export class AttributeCategoryValueEntity {
  @Prop({
    required: true,
    nullable: false,
    type: String,
  })
  value_name: string;

  @Prop({
    required: true,
    nullable: false,
    type: String,
  })
  display_name: string;

  @Prop({
    required: false,
    nullable: true,
    default: '',
  })
  value_unit: string;
}
export const AttributeCategoryValueSchema = SchemaFactory.createForClass(
  AttributeCategoryValueEntity,
);
export type AttributeCategoryValueDoc = AttributeCategoryValueEntity & Document;
