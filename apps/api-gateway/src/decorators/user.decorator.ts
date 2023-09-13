import { AuthJwtAccessGuard } from '../guards/jwt-access/auth.jwt-access.guard';
import { TokenPayloadCheckExist } from '../guards/authentication.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
export function AuthJwtAccessProtected(): MethodDecorator {
  return applyDecorators(UseGuards(TokenPayloadCheckExist, AuthJwtAccessGuard));
}
