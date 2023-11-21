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
import { AuthAccessPayloadSerialization } from '@libs/common/serializations/auth/auth.access-payload.serialization';
import { UserRefreshSerialization } from '@libs/common/serializations/auth/user.refresh.serialization';
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
export function UserAuthRefreshDoc(): MethodDecorator {
  return applyDecorators(
    Doc({ summary: 'refresh a token' }),
    DocAuth({ jwtRefreshToken: true }),
    DocResponse<UserRefreshSerialization>('user.refresh', {
      serialization: UserRefreshSerialization,
    }),
  );
}
export function UserAuthLoginGooglerDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'login with access token google',
    }),
    DocAuth({ google: true }),
    DocResponse('user.loginGoogle'),
  );
}
