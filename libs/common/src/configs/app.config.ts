import { registerAs } from '@nestjs/config';
import { ENUM_APP_ENVIRONMENT } from '../constants/app.enum.constant';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    name: process.env.APP_NAME ?? 'shopee',
    repoVersion: '4.5.6',
    env: process.env.APP_ENV ?? ENUM_APP_ENVIRONMENT.DEVELOPMENT,
  }),
);
