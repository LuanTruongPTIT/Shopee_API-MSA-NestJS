import { applyDecorators } from '@nestjs/common';
import {
  Doc,
  DocAuth,
  DocDefault,
  DocRequest,
  DocResponse,
} from '@libs/common/docs/decorators/doc.decorators';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '@libs/common/docs/constants/doc.enum.constants';
import { UserLoginSerialization } from '@libs/common/serializations/user.login.serialization';
import { AuthAccessPayloadSerialization } from '@libs/common/serializations/auth.access-payload.serialization';
export function UserAuthLoginDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'login with email and password',
    }),
    DocRequest({
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
    }),
    DocResponse<UserLoginSerialization>('user.login', {
      serialization: UserLoginSerialization,
    }),
  );
}

export function UserAuthInfoDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'get info of access token',
    }),
    DocAuth({
      jwtAccessToken: true,
    }),
    DocResponse<AuthAccessPayloadSerialization>('user.info', {
      serialization: AuthAccessPayloadSerialization,
    }),
  );
}
