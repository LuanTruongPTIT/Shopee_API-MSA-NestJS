import { CATEGORY_PRODUCT_LEVEL } from '@libs/common/constants/category.enum';
import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AttributeCategoryEntity } from './attribute-category.schema';
@Schema({ collection: 'category_entity' })
export class CategoryEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    index: true,
    type: String,
    maxlength: 100,
    unique: true,
  })
  category_name: string;

  @Prop({
    required: false,
    nullable: true,
    type: String,
  })
  image: string;

  @Prop({
    required: false,
    nullable: true,
  })
  level: CATEGORY_PRODUCT_LEVEL;

  @Prop({
    type: Boolean,
    default: false,
  })
  isActive: boolean;

  @Prop({
    required: true,
    type: Boolean,
  })
  isParent: boolean;

  @Prop({
    required: false,
    nullable: true,
    // type: [String, null],
  })
  parent: string | null;

  @Prop({
    // type: 'array',
    nullable: true,
    required: false,
    index: true,
  })
  category_parent_id: string[] | null;

  @Prop({
    required: false,
    nullable: true,
    ref: AttributeCategoryEntity.name,
  })
  attribute_category_id: string[];
}

export const CatergorySchema = SchemaFactory.createForClass(CategoryEntity);

export type CategoryDoc = CategoryEntity & Document;
