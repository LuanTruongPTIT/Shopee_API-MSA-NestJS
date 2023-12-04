import { DatabaseMongoUUIDEntityAbstract } from '@libs/common/database_mongoose/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { ItemMaxDimension } from '@libs/common/serializations/logistics/item-max-dimension.serialization';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'shipping_method_entity' })
export class ShippingMethodEntity extends DatabaseMongoUUIDEntityAbstract {
  @Prop({
    required: true,
    type: Number,
  })
  shipping_id: number;

  @Prop({
    required: true,
    lowercase: true,
    maxlength: 30,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    lowercase: true,
    maxlength: 30,
    type: String,
  })
  display_name: string;

  @Prop({
    required: false,
  })
  is_shipping_method_enabled: boolean;

  @Prop({
    required: true,
    nullable: false,
    type: Number,
  })
  item_max_weight: number;

  @Prop({
    required: true,
    nullable: false,
    default: 0,
  })
  item_min_weight: number;

  @Prop({
    required: true,
    nullable: false,
  })
  item_max_dimension: ItemMaxDimension;

  @Prop({
    required: true,
    nullable: false,
    type: Boolean,
  })
  is_free_shipping_shop_channel: boolean;

  @Prop({
    required: true,
    nullable: false,
    type: Boolean,
  })
  is_displayed: boolean;

  @Prop({
    required: false,
    nullable: true,
    default: '',
  })
  block_reason: string;

  @Prop({
    required: false,
    nullable: true,
    default: '',
  })
  parent_id: string;

  @Prop({
    required: false,
    nullable: true,
    default: '',
  })
  parent_id_list: string[];
}
export const ShippingMethodSchema =
  SchemaFactory.createForClass(ShippingMethodEntity);
export type SchippingMethodDoc = ShippingMethodEntity & Document;
