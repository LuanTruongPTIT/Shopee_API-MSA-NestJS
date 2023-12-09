import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'pickup_address_entity' })
export class PickupAddressEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    index: true,
    lowercase: true,
    trim: true,
    type: String,
    maxlength: 50,
  })
  firstname: string;

  @Prop({
    required: true,
    index: true,
    lowercase: true,
    trim: true,
    type: String,
    maxlength: 50,
  })
  lastName: string;

  @Prop({
    required: true,
    trim: true,
    sparse: true,
    unique: true,
    type: String,
    maxlength: 15,
  })
  phone: string;

  @Prop({
    required: false,
    lowercase: true,
    trim: true,
    type: String,
    maxlength: 100,
  })
  address: string;
}
export const PickupAddressSchema =
  SchemaFactory.createForClass(PickupAddressEntity);
export type PickupAddressDoc = PickupAddressEntity & Document;
