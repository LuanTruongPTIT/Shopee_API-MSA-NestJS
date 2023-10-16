import { DatabaseBaseEntityAbstract } from '../../database.base-entity.abstract';

import {
  DATABASE_DELETED_AT_FIELD_NAME,
  DATABASE_UPDATED_AT_FIELD_NAME,
  DATABASE_CREATED_AT_FIELD_NAME,
} from '../../../constants/database.constant';
import { Column } from 'typeorm';
export abstract class DatabaseMongoUUIDEntityAbstract extends DatabaseBaseEntityAbstract<string> {
  @Column({
    type: String,
    // default: DatabaseDefaultUUID,
  })
  _id: string;

  @Column({
    type: Date,
    nullable: false,
  })
  [DATABASE_DELETED_AT_FIELD_NAME]?: Date;

  @Column({
    type: Date,
    nullable: false,
  })
  [DATABASE_CREATED_AT_FIELD_NAME]?: Date;

  @Column({
    type: Date,
    nullable: false,
  })
  [DATABASE_UPDATED_AT_FIELD_NAME]?: Date;
}
