import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RequestUserAgentMiddleware } from '../middleware/user-agent/request.user-agent.middleware';
import { RequestTimeZoneMiddleware } from '../middleware/timezone/request.timezone.middleware';
import { RequestIdMiddleware } from '../middleware/id/request.id.middleware';
export class RequestMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        RequestUserAgentMiddleware,
        RequestTimeZoneMiddleware,
        RequestIdMiddleware,
      )
      .forRoutes('*');
  }
}
