import { EKafkaMessage, EMicroservice } from '@libs/common/interfaces';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { AddCategoryProductRequestDTO } from '@libs/common/dto/category/AddCategoryProductRequest.dto';
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
    await this.clientKafka_category.connect();
  }

  @Post('/add-category')
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
}
