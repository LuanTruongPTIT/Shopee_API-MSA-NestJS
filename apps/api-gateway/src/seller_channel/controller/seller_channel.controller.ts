import { CreateSellerChannelDto } from '@libs/common/dto/seller_channel/create-seller_channel.dto';
import { EKafkaMessage, EMicroservice } from '@libs/common/interfaces';
import { Inject, OnModuleInit, Controller, Post, Body } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { catchError, firstValueFrom, throwError } from 'rxjs';
@ApiTags('Seller Channel')
@Controller('/seller/channel')
export class SellerChannelController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_SELLER_CHANNEL_SERVICE)
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(
      EKafkaMessage.REQUEST_CREATE_SHOP_SELLER_CHANNEL,
    );
    this.clientKafka.connect();
  }

  @Post('/signup-channel')
  async signUpSellerChannel(@Body() data: CreateSellerChannelDto) {
    return firstValueFrom(
      this.clientKafka
        .send(
          EKafkaMessage.REQUEST_CREATE_SHOP_SELLER_CHANNEL,
          JSON.stringify(data),
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }
}
