import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SellerChannelEntity,
  SellerChannelSchema,
} from './entities/seller_channel.schema';
import {
  PickupAddressEntity,
  PickupAddressSchema,
} from './entities/pickup_address.schema';
import { PickupAddressRepository } from './repositories/pickup_address.repository';
import { SellerChannelRepository } from './repositories/seller_channel.repository';

@Module({
  providers: [PickupAddressRepository, SellerChannelRepository],
  exports: [PickupAddressRepository, SellerChannelRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: SellerChannelEntity.name,
        schema: SellerChannelSchema,
      },
      {
        name: PickupAddressEntity.name,
        schema: PickupAddressSchema,
      },
    ]),
  ],
})
export class SellerChannelRepositoryModule {}
