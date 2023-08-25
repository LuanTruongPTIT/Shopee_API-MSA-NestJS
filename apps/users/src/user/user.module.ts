import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserDto } from './database/entities/users.dto';
import { CommandHandlers } from './commands/handlers/index';
import {
  CqrsModule,
  CommandBus,
  EventBus,
  EventPublisher,
  QueryBus,
} from '@nestjs/cqrs';
import { EventStoreModule } from '@libs/core/event-store/lib/event-store.module';
import { CONSTANTS } from '@libs/common/constants/constants';
import { EventStore } from '@libs/core/event-store/lib/event-store';
import { Repository } from 'typeorm';
import { ProjectionDto } from '@libs/core/event-store/lib/adapter/projection.dto';
import { UserService } from './services/users.service';
import { UserCreatedEvent } from './events/impl/user-created.event';
import { EventStoreSubscriptionType } from '@libs/core/event-store/lib/contract';
import { UserRepository } from './repository/user.repository';
import { EventsHandlers } from './events/handlers/index';
import { MongoStore } from '@libs/core/event-store/lib/adapter/mongo-store';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserDto, ProjectionDto]),
    CqrsModule,
    EventStoreModule.registerFeature({
      featureStreamName: CONSTANTS.STREAM_NAME.USER,
      subscriptions: [
        {
          type: EventStoreSubscriptionType.CatchUp,
          stream: CONSTANTS.STREAM_NAME.USER,
          resolveLinkTos: true, // Default is true (Optional)
          lastCheckpoint: 0, // Default is 0 (Optional)
        },
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: CONSTANTS.STREAM_NAME.USER,
          persistentSubscriptionName:
            CONSTANTS.STREAM_NAME.USER + '-' + process.env.PORT,
          resolveLinkTos: true, // Default is true (Optional)
        },
      ],
      eventHandlers: {
        // Warning: add event handles of token or another module can make duplicate write event
        ...UserModule.eventHandlers,
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    CommandBus,
    EventBus,
    QueryBus,
    UserService,
    Repository,
    ...CommandHandlers,
    UserRepository,
    ...EventsHandlers,
    MongoStore,
    EventPublisher,
  ],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus,
    private readonly event$: EventBus,
    private readonly eventStore: EventStore,
    @InjectRepository(ProjectionDto)
    private readonly projectRepository: Repository<ProjectionDto>,
  ) {}

  async onModuleInit() {
    this.command$.register(CommandHandlers);
    this.event$.register(EventsHandlers);
    this.event$.publisher = this.eventStore;
    await this.seedProjection();
  }

  async seedProjection() {
    const streamName = CONSTANTS.STREAM_NAME.USER;
    const userProjection = await this.projectRepository.findOne({
      where: { streamName },
    });
    if (userProjection) {
      await this.projectRepository.save({
        ...userProjection,
        expectedVersion: userProjection.eventNumber,
      });
    } else {
      await this.projectRepository.save({
        ...userProjection,
        eventNumber: 0,
        expectedVersion: CONSTANTS.INIT_EXPECTED_VERSION,
      });
      Logger.log('Seed Projection user success');
    }
  }

  public static eventHandlers = {
    UserCreatedEvent: (streamId, data) => new UserCreatedEvent(streamId, data),
  };
}
