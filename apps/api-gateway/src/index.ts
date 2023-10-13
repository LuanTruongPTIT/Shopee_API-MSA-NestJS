import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from './config/kafka';
import { UserController } from './user/controller/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtAccessStrategy } from './guards/jwt-access/auth.jwt-access.strategy';
import { PassportModule } from '@nestjs/passport';
// import { TokenPayloadCheckExist } from './guards/authentication.guard';
import { RedisModule } from 'libs/redis/src/redis.module';
// import { checkNumberLoginFail } from './guards/checkNumberLoginFail.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { CategoryController } from './category/controller/category.controller';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { RoleController } from './role/controller/role.controller';
import { HttpCacheInterceptor } from './category/interceptor';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ClientsModule.register(clientModuleOptions),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://localhost:6379',
    }),
    JwtModule.register({}),
    PassportModule,
    // RedisModule,
  ],
  controllers: [UserController, CategoryController, RoleController],
  providers: [
    AuthJwtAccessStrategy,
    // TokenPayloadCheckExist,
    // checkNumberLoginFail,
    HttpCacheInterceptor,
  ],
})
export class ControllerModule {}
