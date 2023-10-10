import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  Doc,
  DocDefault,
  DocRequest,
  DocResponse,
} from '../../common/docs/decorators/doc.decorators';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../../common/docs/constants/doc.enum.constants';
import { GetCategoryResponseSerialization } from '../serializations/get-category.response.serialization';

// import {} from '';
export function CategoryAddDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      operation: 'modules.category',
    }),
    DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
    DocResponse('Create attribute category success'),
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
    DocDefault<GetCategoryResponseSerialization>({
      httpStatus: HttpStatus.OK,
      serialization: GetCategoryResponseSerialization,
      statusCode: 201,
      messagePath: 'Get category success',
    }),
  );
}
