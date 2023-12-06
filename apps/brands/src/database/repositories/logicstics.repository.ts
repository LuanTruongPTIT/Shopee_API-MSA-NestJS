import { DatabaseMongoUUIDRepositoryAbstract } from '@libs/common/database_mongoose/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import {
  SchippingMethodDoc,
  ShippingMethodEntity,
} from '../entites/shipping.entites';
import { Model } from 'mongoose';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingMethodRepository extends DatabaseMongoUUIDRepositoryAbstract<
  ShippingMethodEntity,
  SchippingMethodDoc
> {
  constructor(
    @DatabaseModel(ShippingMethodEntity.name)
    private readonly shippingModel: Model<ShippingMethodEntity>,
  ) {
    super(shippingModel);
  }
}
