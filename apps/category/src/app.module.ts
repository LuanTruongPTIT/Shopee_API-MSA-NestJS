import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { validate } from './index';
import { EventStoreModule } from '@libs/core/event-store/lib/event-store.module';
import { CategoryModule } from './category/category.module';
import { ormConfig } from './category/infrastructure/repository/database/orm.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRoot(ormConfig()),
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
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
