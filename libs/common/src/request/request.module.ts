// export class RequestMO
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  ThrottlerGuard,
  ThrottlerModule,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RequestMiddlewareModule } from './middleware/request.middleware.module';
import { MobileNumberAllowedConstraint } from './validations/request.mobile-number-allowed.validation';
@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    MobileNumberAllowedConstraint,
  ],
  imports: [
    RequestMiddlewareModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: config.get('REQUEST_THROTTLE_TTL'),
            limit: config.get('REQUEST_THROTTLE_LIMIT'),
          },
        ],
      }),
    }),
  ],
})
export class RequestModule {}
