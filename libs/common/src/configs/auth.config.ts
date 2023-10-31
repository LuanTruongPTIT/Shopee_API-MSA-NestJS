import { registerAs } from '@nestjs/config';
import { seconds } from '@libs/common/helper/constants/helper.function.constant';
export default registerAs(
  'auth',
  (): Record<string, any> => ({
    accessToken: {
      secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY,
      expirationTime: seconds(process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED),
      notBeforeExpirationTime: seconds('0'),
    },
    refreshToken: {
      secretKey: process.env.AUTH_JWT_REFRESH_TOKEN_SECRET_KEY,
      expirationTime: seconds(process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRED),
      notBeforeExpirationTime: seconds('0'),
    },
    password: {
      saltLength: 8,
      expiredIn: seconds('182d'),
      maxAttempt: 5,
    },
    tokenEmail: {
      tokenEmailSecretKey: process.env.JWT_SECRET_TOKEN_EMAIL,
      tokenEmailExpirationTime: seconds(process.env.JWT_EXPIREIN_TOKEN_EMAIL),
      tokenEmailNotBeforeExpirationTime: seconds(
        process.env.JWT_TOKEN_EMAIL_NOT_BEFORE_EXPIRATION_TIME,
      ),
    },
    subject: process.env.AUTH_JWT_SUBJECT ?? 'user',
    audience: process.env.AUTH_JWT_AUDIENCE ?? 'https://localhost:8000',
    issuer: process.env.AUTH_JWT_ISSUER ?? 'ack',
    prefixAuthorization: 'Bearer',
  }),
);
