import { EKafkaMessage, EMicroservice } from '@libs/common/interfaces';
import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { AddCategoryProductRequestDTO } from '@libs/common/dto/category/AddCategoryProductRequest.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddAttributeCategoryRequestDto_v2 } from '@libs/common/dto/category/AddAttributCategory.v2.request.dto';
import { CategoryAddDoc } from '../decorators/category.decorator.docs';
import { GetCategoryDoc } from '../decorators/category.decorator.docs';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateCategoryDto } from '@libs/common/dto/product/Create.category.dto';
@ApiTags('Product')
@Controller('/product')
export class ProductController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_PRODUCT_SERVICE)
    private readonly clientKafka_product: ClientKafka,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async onModuleInit() {
    this.clientKafka_product.subscribeToResponseOf(
      EKafkaMessage.REQUEST_ADD_CATEGORY_PRODUCT,
    );
    this.clientKafka_product.subscribeToResponseOf(
      EKafkaMessage.REQUEST_GET_ALL_CATEGORY,
    );
    this.clientKafka_product.subscribeToResponseOf(
      EKafkaMessage.REQUEST_ADD_ATTRIBUTE_CATEGORY,
    );
    await this.clientKafka_product.connect();
  }

  @CategoryAddDoc()
  @Post('/add/category')
  async AddCategory(@Body() data: CreateCategoryDto) {
    console.log(JSON.stringify(data));
    return firstValueFrom(
      this.clientKafka_product
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
    const keys: string[] = await this.cacheManager.store.keys();
    console.log(keys);
    return firstValueFrom(
      this.clientKafka_product
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
      this.clientKafka_product
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
