import { AuthJwtAccessGuard } from '../../auth/guards/jwt-access/auth.jwt-access.guard';
import {
  UseGuards,
  applyDecorators,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { UserPayloadPutToRequestGuard } from '../guards/payload/user.payload.put-to-request.guard';
import { JwtTokenEmail } from '../../auth/guards/jwt-token-email/jwt-token-email.guard';
import { IRequestApp } from '@libs/common/request/interfaces/request.interface';
import { UserGetSerialization } from '../serializations/user.get.serialization';
import { UserNotFoundGuard } from '../guards/user.not-found.guard';
// export function AuthJwtAccessProtected(): MethodDecorator {
//   return applyDecorators(UseGuards(TokenPayloadCheckExist, AuthJwtAccessGuard));
// }
export function TokenEmailUserProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(JwtTokenEmail, UserPayloadPutToRequestGuard),
  );
}

export const GetUser = createParamDecorator(
  <T>(returnPlain: boolean, ctx: ExecutionContext): T => {
    const { __user } = ctx
      .switchToHttp()
      .getRequest<IRequestApp & { __user: any }>();
    return __user as T;
  },
);
export function UserProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(UserPayloadPutToRequestGuard, UserNotFoundGuard),
  );
}
