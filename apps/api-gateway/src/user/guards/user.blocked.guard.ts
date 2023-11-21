import { USER_BLOCKED_META_KEY } from '@libs/common/constants/user.enum';
import { IRequestApp } from '@libs/common/request/interfaces/request.interface';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ENUM_USER_STATUS_CODE_ERROR } from 'apps/auth/src/constants/auth.enum';
@Injectable()
export class UserBlockedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const required: boolean[] = this.reflector.getAllAndOverride<boolean[]>(
      USER_BLOCKED_META_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!required) {
      return true;
    }

    const { __user } = context
      .switchToHttp()
      .getRequest<IRequestApp & { __user: Record<string, any> }>();

    if (!required.includes(__user.user.blocked)) {
      throw new BadRequestException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_BLOCKED_ERROR,
        message: 'user.error.blocked',
      });
    }
    return true;
  }
}
