import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  Doc,
  DocDefault,
  DocRequest,
  DocRequestFile,
  DocResponse,
} from '@libs/common/docs/decorators/doc.decorators';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../../../../../libs/common/src/docs/constants/doc.enum.constants';
import { GetCategoryResponseSerialization } from '../serializations/get-category.response.serialization';
import { CreateCategoryDto } from '@libs/common/dto/product/Create.category.dto';
import { FileSingleDto } from '@libs/common/file/dto/file.single.dto';

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
