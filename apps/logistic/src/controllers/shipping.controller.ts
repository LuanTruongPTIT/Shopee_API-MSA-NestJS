
import { CreateShippingMethodDto } from '@libs/common/dto/logistics/create-shipping-method.dto';
import { EKafkaMessage } from '@libs/common/interfaces';
import { BadRequestException, Body, Controller, Inject } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ILogisticServiceInterface } from '../interfaces/logistics.services.interface';
import { IResponse } from '@libs/common/response/interfaces/response.interface';

@Controller('')
export class LogisticsController {
  constructor(
    @Inject(ILogisticServiceInterface)
    private readonly logisticsService: ILogisticServiceInterface,
  ) {}

  @MessagePattern(EKafkaMessage.REQUEST_CREATE_SHIPPING_METHOD)
  async CreateShippingMethod(
    @Body() data: CreateShippingMethodDto,
  ): Promise<IResponse> {
    console.log(data);

    const { name, item_max_weight, item_min_weight } = data;
    if (item_max_weight < item_min_weight) {
      throw new RpcException(
        new BadRequestException({
          statusCode: 400,
          message: 'item_max_weight is greater than item_min_weight',
        }),
      );
    }
    const shipping_id =
      this.logisticsService.mappingWithNameMethodShipping(name);
    await this.logisticsService.createShippingMethod({
      ...data,
      shipping_id,
      display_name: data.name,
    });

    return {
      data: {
        status: 200,
        message: 'Create shipping method successs',
      },
    };
  }
}
