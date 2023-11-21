import { IRequestApp } from '@libs/common/request/interfaces/request.interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from 'apps/auth/src/constants/auth.enum';

@Injectable()
export class UserNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __user } = context
      .switchToHttp()
      .getRequest<IRequestApp & { __user: Record<string, any> }>();

    if (!__user) {
      throw new NotFoundException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
        message: 'user.error.notFound',
      });
    }
    return true;
  }
}
