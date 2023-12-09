import { DatabaseMongoUUIDRepositoryAbstract } from '@libs/common/database_mongoose/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import {
  SellerChannelDoc,
  SellerChannelEntity,
} from '../entities/seller_channel.schema';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  PickupAddressDoc,
  PickupAddressEntity,
} from '../entities/pickup_address.schema';

@Injectable()
export class PickupAddressRepository extends DatabaseMongoUUIDRepositoryAbstract<
  PickupAddressEntity,
  PickupAddressDoc
> {
  constructor(
    @DatabaseModel(PickupAddressEntity.name)
    private readonly pickupAddressModel: Model<PickupAddressEntity>,
  ) {
    super(pickupAddressModel);
  }
}
