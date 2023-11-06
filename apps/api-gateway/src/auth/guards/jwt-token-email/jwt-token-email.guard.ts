import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ENUM_AUTH_STATUS_CODE_ERROR } from '../../constants/auth.status-code.constant';

@Injectable()
export class JwtTokenEmail extends AuthGuard('jwtTokenEmail') {
  handleRequest<TUser = any>(err: Error, userId: TUser, info: Error): TUser {
    console.log(userId);
    if (err || !userId) {
      throw new UnauthorizedException({
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.JWT_TOKEN_EMAIL_VERIFY,
        message: 'error.tokenEmailUnauthorized',
        _error: err ? err.message : info.message,
      });
    }
    return userId;
  }
}
