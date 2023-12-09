import { DatabaseMongoUUIDRepositoryAbstract } from '@libs/common/database_mongoose/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import {
  SellerChannelDoc,
  SellerChannelEntity,
} from '../entities/seller_channel.schema';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SellerChannelRepository extends DatabaseMongoUUIDRepositoryAbstract<
  SellerChannelEntity,
  SellerChannelDoc
> {
  constructor(
    @DatabaseModel(SellerChannelEntity.name)
    private readonly sellerChannelModel: Model<SellerChannelEntity>,
  ) {
    super(sellerChannelModel);
  }
}
