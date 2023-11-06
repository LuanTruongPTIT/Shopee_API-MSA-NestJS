import { AuthJwtAccessGuard } from '../../auth/guards/jwt-access/auth.jwt-access.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserPayloadPutToRequestGuard } from '../guards/payload/user.payload.put-to-request.guard';
import { JwtTokenEmail } from '../../auth/guards/jwt-token-email/jwt-token-email.guard';
// export function AuthJwtAccessProtected(): MethodDecorator {
//   return applyDecorators(UseGuards(TokenPayloadCheckExist, AuthJwtAccessGuard));
// }
export function TokenEmailUserProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(JwtTokenEmail, UserPayloadPutToRequestGuard),
  );
}
