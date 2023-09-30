/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Body } from '@nestjs/common';
import { EKafkaMessage } from '@libs/common/interfaces/kafka.interface';
import { AddCategoryProductRequestDTO } from './dto/addCategoryProductRequest.dto';
import { AddCategoryProductCommand } from '../application/command/impl/add-category.command';
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
}
