import { Controller, Inject } from '@nestjs/common';
import { ISellerChannelServiceInterface } from '../interfaces/ISeller_channel.interface';
import { MessagePattern } from '@nestjs/microservices';
import { EKafkaMessage } from '@libs/common/interfaces';
import { CreateSellerChannelDto } from '@libs/common/dto/seller_channel/create-seller_channel.dto';
import { IResponse } from '@libs/common/response/interfaces/response.interface';

@Controller()
export class SellerChannelController {
  constructor(
    @Inject(ISellerChannelServiceInterface)
    private readonly sellerChannelService: ISellerChannelServiceInterface,
  ) {}

  @MessagePattern(EKafkaMessage.REQUEST_CREATE_SHOP_SELLER_CHANNEL)
  async createSignUpSellerChannel(
    data: CreateSellerChannelDto,
  ): Promise<IResponse> {
    const result = await this.sellerChannelService.signUpSellerChannel(data);
    return {
      data: {
        messgae: 'Sign up seller channel',
        statusCode: 201,
        data: {
          shop_id: result._id,
        },
      },
    };
  }
}
