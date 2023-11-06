import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'TokenEntity' })
export class TokenEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    nullable: false,
  })
  refreshToken: string;

  @Prop({
    required: true,
    nullable: false,
  })
  userId: string;
}

export const TokenSchema = SchemaFactory.createForClass(TokenEntity);
export type TokenDoc = TokenEntity & Document;
