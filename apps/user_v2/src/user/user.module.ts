import {
  EventStoreModule,
  EventStoreSubscriptionType,
  EventStore,
} from '@juicycleff/nestjs-event-store';
import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { CommandHandlers } from './application/command/handler/index';
import { EventsHandlers } from './application/event/index';
import { CreateUserSuccessEvent } from './domain/event/create-user.event';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '@libs/common/database_mongoose/constants/database.constant';
import { DatabaseOptionModule } from '@libs/common/database_mongoose/database.options.module';
import { DatabaseOptionsService } from '@libs/common/database_mongoose/services/database.options.service';
import { validate } from './config/index';
import config from '@libs/common/configs/index';
import { ConfigModule } from '@nestjs/config';
import { UserRepositoryModule } from './infrastructure/repository/user.repository.module';
import { MobileNumberAllowedConstraint } from '@libs/common/request/validations/request.mobile-number-allowed.validation';
import { UserController } from './interface/user.controller';
import { HelperModule } from '@libs/common/helper/helper.module';
import { HelperHashService } from '@libs/common/helper/services/helper.hash.service';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { clientModuleOptions } from '../kafka';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: config,
    }),
    ClientsModule.register(clientModuleOptions),
    CqrsModule,
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$svc-user',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: '$svc-user',
          persistentSubscriptionName: 'user',
        },
      ],
      eventHandlers: {
        ...UserModule.eventHandlers,
      },
    }),
    MongooseModule.forRootAsync({
      // connectionName: DATABASE_CONNECTION_NAME,
      imports: [DatabaseOptionModule],
      inject: [DatabaseOptionsService],
      useFactory: (databaseOptionsService: DatabaseOptionsService) => {
        return databaseOptionsService.createOptions();
      },
    }),
    UserRepositoryModule,
    // HelperModule,
  ],
  providers: [
    ...CommandHandlers,
    ...EventsHandlers,
    MobileNumberAllowedConstraint,
    HelperHashService,
    HelperDateService,
  ],
  controllers: [UserController],
})
export class UserModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus,
    private readonly eventStore: EventStore,
    private readonly event$: EventBus,
  ) {}

  async onModuleInit() {
    this.event$.publisher = this.eventStore;
    this.command$.register(CommandHandlers);
    this.event$.register(EventsHandlers);
  }

  public static eventHandlers = {
    CreateUserHandlerSuccessEvent: (streamId: string, tokenEmail: string) =>
      new CreateUserSuccessEvent(streamId, tokenEmail),
  };
}
