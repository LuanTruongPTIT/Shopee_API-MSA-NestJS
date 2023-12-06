import { CreateShippingMethodDto } from '@libs/common/dto/logistics/create-shipping-method.dto';
import { EKafkaMessage, EMicroservice } from '@libs/common/interfaces';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
@ApiTags('Logistics')
@Controller('/logistics')
export class LogisticsController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_LOGISTICS_SERVICE)
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(
      EKafkaMessage.REQUEST_CREATE_SHIPPING_METHOD,
    );
    this.clientKafka.connect();
  }

  @Post('/create-shipping-method')
  async CreateShippingMethod(@Body() data: CreateShippingMethodDto) {
    return firstValueFrom(
      this.clientKafka
        .send(
          EKafkaMessage.REQUEST_CREATE_SHIPPING_METHOD,
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
