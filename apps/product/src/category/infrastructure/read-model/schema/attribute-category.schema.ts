/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { CategoryEntity } from './category.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AttributeCategoryValueSerialization } from '@libs/common/serializations/product/attribute-category.value.serialization';
import { Document } from 'mongoose';
import { AttributeCategoryValueEntity } from './attribute-category-value.schema';
@Schema({ collection: 'attribute_category_entity' })
export class AttributeCategoryEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    nullable: false,
    default: false,
    type: String,
  })
  attribute_name: string;

  @Prop({
    required: true,
    nullable: false,
    type: String,
  })
  display_name: string;

  @Prop({
    required: false,
    nullable: true,
    type: Boolean,
  })
  mandatory: boolean;

  @Prop({
    required: false,
    ref: AttributeCategoryValueEntity.name,
    index: true,
    nullable: true,
  })
  attribute_value_id: string[];
}
export const AttributeCateogrySchema = SchemaFactory.createForClass(
  AttributeCategoryEntity,
);
export type AttributeCategoryDoc = AttributeCategoryEntity & Document;
