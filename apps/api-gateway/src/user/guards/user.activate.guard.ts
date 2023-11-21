/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ACTIVE_META_KEY } from '@libs/common/constants/user.enum';
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
export class UserActiveGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required: boolean[] = this.reflector.getAllAndOverride(
      USER_ACTIVE_META_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!required) {
      return true;
    }
    const { __user } = context
      .switchToHttp()
      .getRequest<IRequestApp & { __user: Record<string, any> }>();
    console.log('__user', __user);
    if (!required.includes(__user.user.isActive)) {
      throw new BadRequestException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_IS_ACTIVE_ERROR,
        message: 'user.error.isActiveInvalid',
      });
    }
    return true;
  }
}
