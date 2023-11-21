import { CreateCategoryDto } from '@libs/common/dto/product/Create.category.dto';
import { EKafkaMessage } from '@libs/common/interfaces';
import { Body, Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCategoryCommand } from '../../application/command/create-category.command';

@Controller()
export class CategoryController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern(EKafkaMessage.REQUEST_ADD_CATEGORY_PRODUCT)
  async CreateCategory(@Body() data: CreateCategoryDto) {
    const _id = 'e04adbfe-62fe-4bb5-9295-af2ba193c12c';
    console.log(data);
    return this.commandBus.execute(
      new CreateCategoryCommand(
        _id,
        data.category_name,
        data.isParent,
        data.subscategories,
      ),
    );
  }
}
