import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RedisModule } from '@libs/common/redis/redis.module';
import { CategoryModule } from './product/category.module';
import { RoleModule } from './role/role.module';
import { AppController } from './app/controller/app.controller';
import { UserController } from './user/controller/user.controller';
import { UserPayloadPutToRequestGuard } from './user/guards/payload/user.payload.put-to-request.guard';
import { UserNotFoundGuard } from './user/guards/user.not-found.guard';
import { UserActiveGuard } from './user/guards/user.activate.guard';
import { UserBlockedGuard } from './user/guards/user.blocked.guard';
import { AuthController } from './auth/controller/auth.controller';

import { RoleController } from './role/controller/role.controller';
import { JwtTokenEmailStrategy } from './auth/guards/jwt-token-email/jwt-token-email.strategy';
import { AuthJwtAccessStrategy } from './auth/guards/jwt-access/auth.jwt-access.strategy';
import { CheckTokenPayload } from './auth/guards/auth.check-token-redis.guard';
import { AuthJwtAccessGuard } from './auth/guards/jwt-access/auth.jwt-access.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from './config/kafka';
import { AuthJwtRefreshGuard } from './auth/guards/jwt-refreshtoken/auth.jwt-refresh.guard';
import { AuthJwtRefreshStrategy } from './auth/guards/jwt-refreshtoken/auth.jwt-refresh.strategy';
import { GoogleStrategy } from './auth/guards/google-authentication/auth.google-strategry';
import { SessionSerializer } from './auth/utils/Serializer';
import { ProductController } from './product/controller/product.controller';
import { RequestModule } from '@libs/common/request/request.module';
import { PolicyModule } from '@libs/common/policy/policy.module';
import { LogisticsController } from './logistics/controller/logistics.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from './product/interceptor/cache.interceptor';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ClientsModule.register(clientModuleOptions),
    RedisModule.forRoot(),
    // AuthModule,
    // UserModule,
    // RoleModule,
    // CategoryModule,
    // ClientModule.forRoot(),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    RoleController,
    ProductController,
    LogisticsController,
  ],
  providers: [
    UserPayloadPutToRequestGuard,
    UserNotFoundGuard,
    UserBlockedGuard,
    UserActiveGuard,
    JwtTokenEmailStrategy,
    AuthJwtAccessStrategy,
    CheckTokenPayload,
    AuthJwtAccessGuard,
    AuthJwtRefreshGuard,
    AuthJwtRefreshStrategy,
    GoogleStrategy,
    SessionSerializer,
    CacheInterceptor,

    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class ControllerModule {}
