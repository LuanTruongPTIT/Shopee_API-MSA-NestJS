import { Provider } from '@nestjs/common';
import IORedis, { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import {
  REDIS_PUBLISHER_CLIENT,
  REDIS_SUBSCRIBER_CLIENT,
} from './redis.constants';
export const redisProviders: Provider[] = [
  {
    useFactory: (configService: ConfigService): Redis => {
      return new IORedis({
        host: 'localhost',
        port: 6379,
      });
    },
    provide: REDIS_SUBSCRIBER_CLIENT,
  },
  {
    useFactory: (configService: ConfigService): Redis => {
      return new IORedis({
        host: 'localhost',
        port: 6379,
      });
    },
    provide: REDIS_PUBLISHER_CLIENT,
  },
];
