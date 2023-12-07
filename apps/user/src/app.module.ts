import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { validate } from './index';
import { EventStoreModule } from '@libs/core/event-store/lib/event-store.module';
import { UserModule } from './user/user.module';
import config from '@libs/common/configs/auth.config';
import {
  typeormConfig,
  datasource,
} from './user/infrastructure/repository/database/orm.config';
import { ProjectionDto } from '@libs/core/event-store/lib/adapter/projection.dto';
import { RefreshTokenEntity } from './user/infrastructure/entity/token.entity';
import { UserEntity } from './user/infrastructure/entity/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormConfig,

      dataSourceFactory: async () => {
        await datasource.initialize();
        return datasource;
      },
    }),
    TypeOrmModule.forFeature([ProjectionDto, RefreshTokenEntity, UserEntity]),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
