import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ShippingMethodEntity,
  ShippingMethodSchema,
} from './entites/shipping.entites';
import { ShippingMethodRepository } from './repositories/logicstics.repository';

@Module({
  providers: [ShippingMethodRepository],
  exports: [ShippingMethodRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: ShippingMethodEntity.name,
        schema: ShippingMethodSchema,
      },
    ]),
  ],
})
export class ShippingMethodRepositoryModule {}
