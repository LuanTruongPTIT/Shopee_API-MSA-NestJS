import { EKafkaMessage, EMicroservice } from '@libs/common/interfaces';
import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { AddCategoryProductRequestDTO } from '@libs/common/dto/category/AddCategoryProductRequest.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddAttributeCategoryRequestDto_v2 } from '@libs/common/dto/category/AddAttributCategory.v2.request.dto';
import { CategoryAddDoc } from '../decorators/category.decorator.docs';
import { GetCategoryDoc } from '../decorators/category.decorator.docs';
@ApiTags('Category')
@Controller('/category')
export class CategoryController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_CATEGORY_SERVICE)
    private readonly clientKafka_category: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka_category.subscribeToResponseOf(
      EKafkaMessage.REQUEST_ADD_CATEGORY_PRODUCT,
    );
    this.clientKafka_category.subscribeToResponseOf(
      EKafkaMessage.REQUEST_GET_ALL_CATEGORY,
    );
    this.clientKafka_category.subscribeToResponseOf(
      EKafkaMessage.REQUEST_ADD_ATTRIBUTE_CATEGORY,
    );
    await this.clientKafka_category.connect();
  }

  @CategoryAddDoc()
  @Post('/add/category')
  async AddCategory(@Body() data: AddCategoryProductRequestDTO) {
    return firstValueFrom(
      this.clientKafka_category
        .send(EKafkaMessage.REQUEST_ADD_CATEGORY_PRODUCT, JSON.stringify(data))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }

  @GetCategoryDoc()
  @Get('')
  async GetAllCategory() {
    const message = 'get all category';
    return firstValueFrom(
      this.clientKafka_category
        .send(EKafkaMessage.REQUEST_GET_ALL_CATEGORY, JSON.stringify(message))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }

  @Post('/add/attribute')
  async AddAttributeCategory(
    @Body() data: AddAttributeCategoryRequestDto_v2,
  ): Promise<void> {
    return firstValueFrom(
      this.clientKafka_category
        .send(
          EKafkaMessage.REQUEST_ADD_ATTRIBUTE_CATEGORY,
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
