import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PickupAddressEntity } from './pickup_address.schema';
import mongoose, { Document } from 'mongoose';

@Schema({ collection: 'seller_channel_entity' })
export class SellerChannelEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    nullable: false,
    maxlength: 40,
    type: String,
  })
  shop_name: string;

  @Prop({
    required: true,
    ref: PickupAddressEntity.name,
    index: true,
  })
  pick_up_address_id: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    nullable: false,
    isArray: true,
  })
  shipping_method_id: string[];

  @Prop({
    required: true,
    nullable: false,
    type: String,
  })
  user_id: string;
}
export const SellerChannelSchema =
  SchemaFactory.createForClass(SellerChannelEntity);
export type SellerChannelDoc = SellerChannelEntity & Document;
