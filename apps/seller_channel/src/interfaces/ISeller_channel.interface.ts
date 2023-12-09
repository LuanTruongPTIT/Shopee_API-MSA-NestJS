import { CreateSellerChannelDto } from '@libs/common/dto/seller_channel/create-seller_channel.dto';
import { SellerChannelEntity } from '../database/entities/seller_channel.schema';

export const ISellerChannelServiceInterface = Symbol.for(
  'ISellerChannelServiceInterface',
);
export interface ISellerChannelServiceInterface {
  signUpSellerChannel: (
    data: CreateSellerChannelDto,
  ) => Promise<SellerChannelEntity>;
}
