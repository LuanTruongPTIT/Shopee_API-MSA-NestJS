import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ collection: ' RoleEntity' })
export class RoleEntity extends DatabaseMongoUUIDEntityAbstract {}
export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
