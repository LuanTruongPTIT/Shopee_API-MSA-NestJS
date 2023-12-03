import {
  UseGuards,
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { AuthJwtAccessGuard } from '../guards/jwt-access/auth.jwt-access.guard';
import { IRequestApp } from '@libs/common/request/interfaces/request.interface';
import { UserPayloadPutToRequestGuard } from '../../user/guards/payload/user.payload.put-to-request.guard';
import { UserNotFoundGuard } from '../../user/guards/user.not-found.guard';
import { UserActiveGuard } from '../../user/guards/user.activate.guard';
import { UserBlockedGuard } from '../../user/guards/user.blocked.guard';
import {
  USER_ACTIVE_META_KEY,
  USER_BLOCKED_META_KEY,
} from '@libs/common/constants/user.enum';
import { AuthJwtRefreshGuard } from '../guards/jwt-refreshtoken/auth.jwt-refresh.guard';
import { RolePayloadTypeGuard } from '../../role/guard/role.payload.type.guard';
import { ROLE_TYPE_META_KEY } from '../../role/constants/role.constants';
import { ENUM_ROLE_TYPE } from '@libs/common/constants/role.enum.constant';

export const AuthJwtPayload = createParamDecorator(
  <T>(data: string, ctx: ExecutionContext): T => {
    const { user } = ctx.switchToHttp().getRequest<IRequestApp & { user: T }>();
    return data ? user[data] : user;
  },
);
export function AuthJwtAccessProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthJwtAccessGuard));
}

export function AuthJwtRefreshProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthJwtRefreshGuard));
}
export const AuthJwtToken = createParamDecorator(
  (data: string, ctx: ExecutionContext): string => {
    const { headers } = ctx.switchToHttp().getRequest<IRequestApp>();
    const { authorization } = headers;
    const authorizations: string[] = authorization.split(' ');
    console.log(authorizations);
    return authorization.length >= 2 ? authorizations[1] : undefined;
  },
);

export function UserAuthProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(UserActiveGuard, UserBlockedGuard),
    SetMetadata(USER_ACTIVE_META_KEY, [true]),
    SetMetadata(USER_BLOCKED_META_KEY, [false]),
  );
}

export function AuthJwtAdminAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
    SetMetadata(ROLE_TYPE_META_KEY, [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.BUYER,
    ]),
  );
}
