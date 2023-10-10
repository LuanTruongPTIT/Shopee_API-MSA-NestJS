import { SchemaOptions, Schema } from '@nestjs/mongoose';
import {
  DATABASE_CREATED_AT_FIELD_NAME,
  DATABASE_UPDATED_AT_FIELD_NAME,
} from '../constants/database.constant';
export function DatabaseEntity(options: SchemaOptions): ClassDecorator {
  return Schema({
    ...options,
    versionKey: false,
    timestamps: {
      createdAt: DATABASE_CREATED_AT_FIELD_NAME,
      updatedAt: DATABASE_UPDATED_AT_FIELD_NAME,
    },
  });
}
