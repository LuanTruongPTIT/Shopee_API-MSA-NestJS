import {
  UseGuards,
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { AuthJwtAccessGuard } from '../guards/jwt-access/auth.jwt-access.guard';
import { IRequestApp } from '@libs/common/request/interfaces/request.interface';
import { CheckTokenPayload } from '../guards/auth.check-token-redis.guard';

export const AuthJwtPayload = createParamDecorator(
  <T>(data: string, ctx: ExecutionContext): T => {
    const { user } = ctx.switchToHttp().getRequest<IRequestApp & { user: T }>();
    return data ? user[data] : user;
  },
);
export function AuthJwtAccessProtected(): MethodDecorator {
  return applyDecorators(UseGuards(CheckTokenPayload, AuthJwtAccessGuard));
}
