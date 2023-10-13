import { Module } from '@nestjs/common';

import { EventStoreModule } from '@juicycleff/nestjs-event-store';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    EventStoreModule.register({
      type: 'event-store',
      tcpEndpoint: {
        host: 'localhost',
        port: 1113,
      },
      options: {
        defaultUserCredentials: {
          username: 'admin',
          password: 'changeit',
        },
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
