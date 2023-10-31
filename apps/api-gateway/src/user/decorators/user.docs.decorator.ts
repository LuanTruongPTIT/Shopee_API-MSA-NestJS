import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  Doc,
  DocRequest,
  DocResponse,
} from '@libs/common/docs/decorators/doc.decorators';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '@libs/common/docs/constants/doc.enum.constants';

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

export function VerifyEmailDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      operation: 'module.public.user',
    }),
    DocRequest({
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocResponse('Verify email is success', {
      httpStatus: HttpStatus.OK,
      statusCode: 200,
      // message: 'Verify email is success',
    }),
  );
}
