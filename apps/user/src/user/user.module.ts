import { CONSTANTS } from '@libs/common/constants/constants';
import { ProjectionDto } from '@libs/core/event-store/lib/adapter/projection.dto';
import { Logger, Module, OnModuleInit, Provider } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { EventStoreModule } from '@libs/core/event-store/lib/event-store.module';
import { Repository } from 'typeorm';
import { EventStoreSubscriptionType } from '@libs/core/event-store/lib/contract';
import {
  CommandBus,
  CqrsModule,
  EventBus,
  EventPublisher,
  QueryBus,
} from '@nestjs/cqrs';
import { MongoStore } from '@libs/core/event-store/lib/adapter/mongo-store';
import { UserEntity } from './infrastructure/entity/user.entity';
import { InjectionToken } from './application/InjectionToken';
import { UserRepositoryImplement } from './infrastructure/repository/userRepositoryImplement';
import { UserFactory } from './domain/user.factory';
import { UserController } from './interface/user.controller';
import { CommandHandlers } from './application/command/handler';
import { EventsHandlers } from './application/event';
import { MobileNumberAllowedConstraint } from '@libs/common/request/validations/request.mobile-number-allowed.validation';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { HelperHashService } from '@libs/common/helper/services/helper.hash.service';
import { HelperModule } from '@libs/common/helper/helper.module';
import { EventStore } from '@libs/core/event-store/lib/event-store';
import { CreateUserSuccessEvent } from './domain/event/create-user.event';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from '../kafka';
import { UserQueryImplement } from './infrastructure/query/UserQueryImplement';
import { QueryHandlers } from './application/query/handler/index';
import { UserService } from './domain/user.service';
import { RefreshTokenEntity } from './infrastructure/entity/token.entity';
const infrastructure: Provider[] = [
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
  {
    provide: InjectionToken.USER_QUERY,
    useClass: UserQueryImplement,
  },
];
const domain = [UserFactory];
@Module({
  imports: [
    ClientsModule.register(clientModuleOptions),
    TypeOrmModule.forFeature([ProjectionDto, RefreshTokenEntity, UserEntity]),
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
    HelperModule,
  ],
  controllers: [UserController],
  providers: [
    MongoStore,
    CommandBus,
    QueryBus,
    EventBus,
    Repository,
    EventPublisher,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventsHandlers,
    MobileNumberAllowedConstraint,
    HelperHashService,
    HelperDateService,
    ...infrastructure,
    UserFactory,
    UserService,
  ],
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
    this.event$.publisher = this.eventStore;
    this.command$.register(CommandHandlers);
    this.query$.register(QueryHandlers);
    this.event$.register(EventsHandlers);
    await this.seedProjection();
  }

  async seedProjection() {
    const streamName = CONSTANTS.STREAM_NAME.USER;
    const productProjection = await this.projectRepository.findOne({
      where: { streamName },
    });
    if (productProjection) {
      await this.projectRepository.save({
        ...productProjection,
        expectedVersion: productProjection.eventNumber,
      });
    } else {
      await this.projectRepository.save({
        ...productProjection,
        eventNumber: 0,
        expectedVersion: CONSTANTS.INIT_EXPECTED_VERSION,
      });
      Logger.log('Seed Projection user success');
    }
  }

  public static eventHandlers = {
    CreateUserSuccessEvent: (
      streamId: string,
      tokenEmail: string,
      email: string,
    ) => new CreateUserSuccessEvent(streamId, tokenEmail, email),
  };
}
