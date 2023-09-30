import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  Doc,
  DocRequest,
  DocResponse,
} from '../common/docs/decorators/doc.decorators';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../common/docs/constants/doc.enum.constants';

export function UserSignUpDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      operation: 'module.public.user',
    }),
    DocRequest({
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocResponse('user.signup', {
      httpStatus: HttpStatus.CREATED,
    }),
  );
}
