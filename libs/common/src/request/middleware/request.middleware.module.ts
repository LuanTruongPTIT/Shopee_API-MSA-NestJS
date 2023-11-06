import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RequestUserAgentMiddleware } from './user-agent/request.user-agent.middleware';
import { RequestTimeZoneMiddleware } from './timezone/request.timezone.middleware';
import { RequestIdMiddleware } from './id/request.id.middleware';
import { RequestTimestampMiddleware } from './timestamp/request.timestamp.middleware';
export class RequestMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        RequestUserAgentMiddleware,
        RequestTimeZoneMiddleware,
        RequestIdMiddleware,
        RequestTimestampMiddleware,
      )
      .forRoutes('*');
  }
}
