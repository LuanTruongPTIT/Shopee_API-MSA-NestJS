import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserPayloadPutToRequestGuard } from './guards/payload/user.payload.put-to-request.guard';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from './config/kafka';
import { RedisModule } from '@libs/common/redis/redis.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    ClientsModule.register(clientModuleOptions),
    // CacheModule.register<RedisClientOptions>({
    //   store: redisStore,
    //   url: 'redis://localhost:6379',
    // }),
  ],
  controllers: [UserController],
  providers: [UserPayloadPutToRequestGuard],
  exports: [UserPayloadPutToRequestGuard],
})
export class UserModule {}
