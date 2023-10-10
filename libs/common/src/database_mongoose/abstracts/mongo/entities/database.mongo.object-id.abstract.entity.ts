import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  DATABASE_DELETED_AT_FIELD_NAME,
  DATABASE_UPDATED_AT_FIELD_NAME,
  DATABASE_CREATED_AT_FIELD_NAME,
} from '../../../constants/database.constant';
import { DatabaseDefaultObjectId } from '../../../constants/database.function.constant';
import { DatabaseBaseEntityAbstract } from '../../database.base-entity.abstract';

export abstract class DatabaseMongoObjectIdEntityAbstract extends DatabaseBaseEntityAbstract<Types.ObjectId> {
  @Prop({
    type: Types.ObjectId,
    default: DatabaseDefaultObjectId,
  })
  _id: Types.ObjectId;

  @Prop({
    required: false,
    index: true,
    type: Date,
  })
  [DATABASE_DELETED_AT_FIELD_NAME]?: Date;

  @Prop({
    required: false,
    index: 'asc',
    type: Date,
  })
  [DATABASE_CREATED_AT_FIELD_NAME]?: Date;

  @Prop({
    required: false,
    index: 'desc',
    type: Date,
  })
  [DATABASE_UPDATED_AT_FIELD_NAME]?: Date;
}
