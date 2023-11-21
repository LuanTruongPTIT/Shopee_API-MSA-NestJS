/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { CategoryEntity } from './category.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AttributeCategoryValueSerialization } from '@libs/common/serializations/product/attribute-category.value.serialization';
@Schema({ collection: 'AttributeCategoryEntity' })
export class AttributeCategoryEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    ref: CategoryEntity.name,
    index: true,
  })
  category_id: string;

  @Prop({
    required: true,
    maxlength: 50,
  })
  attribute_name: string;

  attribute_value: AttributeCategoryValueSerialization[];
}
export const AttributeCateogrySchema = SchemaFactory.createForClass(
  AttributeCategoryEntity,
);
