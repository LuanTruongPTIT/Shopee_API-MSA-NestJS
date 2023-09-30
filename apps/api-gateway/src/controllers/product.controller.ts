import { Controller, OnModuleInit, Inject, Body } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EMicroservice } from '@libs/common/interfaces/kafka.interface';
@Controller('/products')
export class ProductController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_PRODUCT_SERVICE)
    private readonly clientKafka: ClientKafka,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onModuleInit() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async AddProduct(@Body() data: string) {}
}
