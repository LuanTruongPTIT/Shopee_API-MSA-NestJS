/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Body } from '@nestjs/common';
import { EKafkaMessage } from '@libs/common/interfaces/kafka.interface';
import { AddCategoryProductRequestDTO } from './dto/addCategoryProductRequest.dto';
import { AddCategoryProductCommand } from '../application/command/impl/add-category.command';
// import { FindAllCategoryResponseDto } from './dto/FindAllCategoryReponse.dto';
import { GetCategoryQuery } from '../application/query/impl/FindAllCategory.query';
@Controller()
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(EKafkaMessage.REQUEST_ADD_CATEGORY_PRODUCT)
  async AddProductCategory(
    @Body() data: AddCategoryProductRequestDTO,
  ): Promise<any> {
    const _id = 'flfllflflfldlfd;f;l';
    return await this.commandBus.execute(
      new AddCategoryProductCommand(_id, data),
    );
  }

  @MessagePattern(EKafkaMessage.REQUEST_GET_ALL_CATEGORY)
  async FindAllCategory(): Promise<any> {
    return await this.queryBus.execute(new GetCategoryQuery());
  }
}
