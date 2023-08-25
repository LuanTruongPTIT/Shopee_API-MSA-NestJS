import { TypeOrmService } from './user/database/datasource/typeorm.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from './user/config/index';
import { TypeormModule } from './user/database/datasource/typeorm.module';
import { EventStoreModule } from '@libs/core/event-store/lib/event-store.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
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
export class AppModule {}
