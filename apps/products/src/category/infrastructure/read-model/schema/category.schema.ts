import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ collection: 'CategoryEntity' })
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
  })
  parent_category_id: string;

  @Prop({
    required: true,
    nullable: false,
    type: String,
    maxLength: 100,
  })
  original_category_name: string;

  @Prop({
    required: true,
    type: Boolean,
  })
  isParent: boolean;
}

export const CatergorySchema = SchemaFactory.createForClass(CategoryEntity);

export type CategoryDoc = CategoryEntity & Document;
