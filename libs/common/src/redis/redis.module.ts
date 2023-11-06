import { CacheModule } from '@nestjs/cache-manager';
import { DynamicModule, Module } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
@Module({})
export class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      imports: [
        CacheModule.register<RedisClientOptions>({
          store: redisStore,
          url: 'redis://localhost:6379',
          isGlobal: true,
        }),
      ],
      providers: [],
    };
  }
}
