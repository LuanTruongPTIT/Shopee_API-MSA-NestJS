import { PickupAddressRepository } from './../database/repositories/pickup_address.repository';
import { Injectable } from '@nestjs/common';
import { ISellerChannelServiceInterface } from '../interfaces/ISeller_channel.interface';
import { CreateSellerChannelDto } from '@libs/common/dto/seller_channel/create-seller_channel.dto';
import {
  SellerChannelDoc,
  SellerChannelEntity,
} from '../database/entities/seller_channel.schema';
import { PickupAddressEntity } from '../database/entities/pickup_address.schema';
import { SellerChannelRepository } from '../database/repositories/seller_channel.repository';
import mongoose from 'mongoose';

@Injectable()
export class SellerChannelService implements ISellerChannelServiceInterface {
  constructor(
    private readonly sellerChannelRepository: SellerChannelRepository,
    private readonly pickupAddressRepository: PickupAddressRepository,
  ) {}

  async signUpSellerChannel(
    data: CreateSellerChannelDto,
  ): Promise<SellerChannelDoc> {
    const sellerChannelEntity = new SellerChannelEntity();
    const pickupAddressEntity = new PickupAddressEntity();
    pickupAddressEntity.firstname = data.pick_up_address.firstName;
    pickupAddressEntity.lastName = data.pick_up_address.lastName;
    pickupAddressEntity.phone = data.pick_up_address.mobilephone;
    pickupAddressEntity.address = data.pick_up_address.address;

    const pickupEntity = await this.pickupAddressRepository.create(
      pickupAddressEntity,
    );
    sellerChannelEntity.shop_name = data.shop_name;
    sellerChannelEntity.shipping_method_id = data.shipping_method_id;
    sellerChannelEntity.user_id = data.user_id;
    sellerChannelEntity.pick_up_address_id = new mongoose.Types.ObjectId(
      pickupEntity._id(),
    );
    const result = await this.sellerChannelRepository.create(
      sellerChannelEntity,
    );
    return result;
  }
}
