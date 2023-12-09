import { EKafkaMessage } from '@libs/common/interfaces';
import { Body, Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCategoryCommand } from '../../application/command/create-category.command';
import { CreateCategorySerilization } from '@libs/common/serializations/product/create.category.serialization';
import { HelperIdManagementService } from '@libs/common/helper/services/helper.id.management.service';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { GetCategoryQuery } from '../../application/query/impl/get-category.query';
import { CreateAttributeCategoryCommand } from '../../application/command/create-attribute.command';
import { CreateAttributeCategoryDto } from '@libs/common/dto/product/create-attribute.category.dto';

@Controller()
export class CategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly helperId: HelperIdManagementService,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(EKafkaMessage.REQUEST_ADD_CATEGORY_PRODUCT)
  async CreateCategory(
    @Body() data: CreateCategorySerilization,
  ): Promise<IResponse> {
    const _id = this.helperId.generateId();
    this.commandBus.execute(
      new CreateCategoryCommand(
        _id,
        data.category_name,
        data.file,
        data.level,
        data.category_parent_id,
      ),
    );
    return {
      data: {
        statusCode: 200,
        message: 'Create Category Success',
        category_id: _id,
      },
    };
  }

  @MessagePattern(EKafkaMessage.REQUEST_ADD_ATTRIBUTE_CATEGORY)
  async CreateAttributeCategory(
    @Body() data: CreateAttributeCategoryDto,
  ): Promise<IResponse> {
    const _id = this.helperId.generateId();
    await this.commandBus.execute(
      new CreateAttributeCategoryCommand(_id, data),
    );
    return {
      data: {
        statusCode: 201,
        message: 'Create attribute catgory success',
      },
    };
  }

  @MessagePattern(EKafkaMessage.REQUEST_GET_ALL_CATEGORY)
  async GetCategory(@Body() data: string) {
    console.log(data);
    const result = await this.queryBus.execute(new GetCategoryQuery());
    return {
      data: result,
    };
  }
}
