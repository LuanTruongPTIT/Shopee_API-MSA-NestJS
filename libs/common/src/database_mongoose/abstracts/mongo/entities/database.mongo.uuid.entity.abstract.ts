import { Prop } from '@nestjs/mongoose';
import { DatabaseBaseEntityAbstract } from '../../database.base-entity.abstract';
import { DatabaseDefaultUUID } from '../../../constants/database.function.constant';
import {
  DATABASE_DELETED_AT_FIELD_NAME,
  DATABASE_UPDATED_AT_FIELD_NAME,
  DATABASE_CREATED_AT_FIELD_NAME,
} from '../../../constants/database.constant';
export abstract class DatabaseMongoUUIDEntityAbstract extends DatabaseBaseEntityAbstract<string> {
  @Prop({
    type: String,
    default: DatabaseDefaultUUID,
  })
  _id: string;

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
