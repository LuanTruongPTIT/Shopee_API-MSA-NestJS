import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RequestUserAgentMiddleware } from '../middleware/user-agent/request.user-agent.middleware';
export class RequestMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestUserAgentMiddleware).forRoutes('*');
  }
}
