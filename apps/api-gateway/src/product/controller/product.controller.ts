/* eslint-disable @typescript-eslint/no-inferrable-types */
import { EKafkaMessage, EMicroservice } from '@libs/common/interfaces';
import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { CategoryAddDoc } from '../decorators/category.decorator.docs';
import { GetCategoryDoc } from '../decorators/category.decorator.docs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateCategoryDto } from '@libs/common/dto/product/Create.category.dto';
import { FileRequiredPipe } from '@libs/common/file/pipes/file.required.pipe';
import { FileUploadSingle } from '@libs/common/file/decorators/file.decorator';
import { IFile } from '@libs/common/file/interface/file.interface';
import FormData from 'form-data';
import { AttributeValueDto } from '@libs/common/dto/product/attribute-value.category.dto';
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
  @FileUploadSingle()
  @Post('/add/category')
  async AddCategory(
    @Body() data: CreateCategoryDto,
    // @GetFileImage()
    // image: IFile,
    @UploadedFile()
    file: IFile,
  ) {
    const form = new FormData();
    form.append('file', file.originalname);
    console.log(data);
    return firstValueFrom(
      this.clientKafka_product
        .send(
          EKafkaMessage.REQUEST_ADD_CATEGORY_PRODUCT,
          JSON.stringify({
            category_name: data.category_name,
            file: file.originalname,
            level: data.level,
            category_parent_id:
              data.category_parent_id !== undefined
                ? data.category_parent_id
                : '',
          }),
        )
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
      this.clientKafka_product
        .send(EKafkaMessage.REQUEST_GET_ALL_CATEGORY, JSON.stringify(message))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }

  @Post('/add/attribute-category')
  async AddAttributeCategory(@Body() data: AttributeValueDto): Promise<void> {
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
