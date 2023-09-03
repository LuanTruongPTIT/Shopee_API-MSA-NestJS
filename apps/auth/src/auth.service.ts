import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UserVerifyStatus,
  TokenType,
} from 'apps/users/src/user/constants/user.enum.constant';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokenWithUserId(userId: string, expiresIn = null) {
    const payload = { id: userId };
    return this.jwtService.sign(payload);
  }

  signEmailVerifyToken({
    user_id,
    verify,
  }: {
    user_id: string;
    verify: UserVerifyStatus;
  }) {
    const expiresIn = process.env.EMAIL_VERIFY_TOKEN_EXPIRESIN;
    const privateKey = process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN;
    Logger.log(expiresIn, privateKey);
    const payload = { user_id, verify, token_type: TokenType.EmailVerifyToken };
    return this.jwtService.sign(payload, {
      expiresIn,
      privateKey,
    });
  }
}
