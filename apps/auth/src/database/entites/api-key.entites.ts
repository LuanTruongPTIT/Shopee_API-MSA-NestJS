import { ENUM_API_KEY_TYPE } from '@libs/common/api-key/constants/api-key.enum.constant';
import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'ApiKeyEntity' })
export class ApiKeyEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    enum: ENUM_API_KEY_TYPE,
    index: true,
    trim: true,
  })
  type: ENUM_API_KEY_TYPE;

  @Prop({
    required: true,
    index: true,
    type: String,
    minlength: 1,
    maxlength: 100,
    lowercase: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
    index: true,
    trime: true,
  })
  key: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  hash: string;

  @Prop({
    required: true,
    index: true,
    type: Boolean,
  })
  isActive: boolean;

  @Prop({
    required: false,
    type: Date,
  })
  startDate?: Date;

  @Prop({
    required: false,
    type: Date,
  })
  endDate?: Date;
}
export const ApiKeySchema = SchemaFactory.createForClass(ApiKeyEntity);
export type ApiKeyDoc = ApiKeyEntity & Document;
