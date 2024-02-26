import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'File_Entity' })
export class FileEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    type: String,
    nullable: false,
  })
  filename: string;

  @Prop({
    required: true,
    type: String,
    nullable: false,
  })
  path: string;

  @Prop({
    required: true,
    type: String,
    nullable: false,
  })
  mimetype: string;
}
export const FileSchema = SchemaFactory.createForClass(FileEntity);
export type FileDoc = FileEntity & Document;
