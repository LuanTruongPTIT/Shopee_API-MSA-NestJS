import { TypeOrmService } from './user/database/datasource/typeorm.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from './index';
import { TypeormModule } from './user/database/datasource/typeorm.module';
import { EventStoreModule } from '@libs/core/event-store/lib/event-store.module';
import { ormConfig } from './user/database/datasource/orm.config';
import { RequestStorageMiddleware } from '@libs/common/shared/RequestStorageMiddleware';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig()),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    EventStoreModule.register({
      tcpEndpoint: {
        host: process.env.EVENT_STORE_HOSTNAME || '0.0.0.0',
        port: 1113,
      },
      options: {
        maxRetries: 10,
        maxReconnections: 100,
        reconnectionDelay: 5000,
        heartbeatInterval: 1000,
        heartbeatTimeout: 500,
        verboseLogging: true,
        maxDiscoverAttempts: 100000,
        failOnNoServerResponse: true,
        defaultUserCredentials: {
          username: process.env.EVENT_STORE_CREDENTIALS_USERNAME || 'admin',
          password: process.env.EVENT_STORE_CREDENTIALS_PASSWORD || 'changeit',
        },
      },
    }),
    UserModule,
    TypeormModule,
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(RequestStorageMiddleware).forRoutes('*');
  // }
}
