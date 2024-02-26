import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  Doc,
  DocDefault,
  DocRequestFile,
  DocResponse,
} from '@libs/common/docs/decorators/doc.decorators';
import { GetCategoryResponseSerialization } from '../serializations/get-category.response.serialization';
import { CreateCategoryDto } from '@libs/common/dto/product/create.category.dto';
import { FileSingleDto } from '@libs/common/file/dto/file.single.dto';
import { CreateProductDto } from '@libs/common/dto/product/create-product.dto';

// import {} from '';
export function CategoryAddDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      operation: 'modules.category',
    }),
    DocRequestFile({ body: CreateCategoryDto }),

    DocResponse('Create category success'),
    DocDefault({
      httpStatus: HttpStatus.BAD_REQUEST,
      messagePath: 'Category not found',
      statusCode: 400,
    }),
  );
}
export function GetCategoryDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      operation: 'modules.category.get.category',
    }),
    DocResponse('Get category success'),
    DocDefault<GetCategoryResponseSerialization>({
      httpStatus: HttpStatus.OK,
      serialization: GetCategoryResponseSerialization,
      statusCode: 201,
      messagePath: 'Get category success',
    }),
  );
}

export function CreateProductDoc(): MethodDecorator {
  return applyDecorators(DocRequestFile({ body: CreateProductDto }));
}
export function FileUploadDoc() {
  return applyDecorators(
    Doc({
      operation: 'modules.upload.file',
    }),
    DocRequestFile({ body: FileSingleDto }),

    // DocResponse('Create category success'),
    DocDefault({
      httpStatus: HttpStatus.BAD_REQUEST,
      messagePath: 'File is not exist',
      statusCode: 400,
    }),
  );
}
