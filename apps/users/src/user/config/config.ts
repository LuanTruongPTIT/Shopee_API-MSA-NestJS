import { envPath } from '../../index';
import dotenv from 'dotenv';
dotenv.config({ path: envPath });
export const envConfig = {
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  jwtSecretAccessToken: process.env.JWT_SECRET_ACCESS_TOKEN as string,
  jwtSecretRefreshToken: process.env.JWT_SECRET_REFRESH_TOKEN as string,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
