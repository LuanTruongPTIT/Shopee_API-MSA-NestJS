import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  Provider,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';

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

import { EventStoreSubscriptionType } from '@libs/core/event-store/lib/contract';

import { MongoStore } from '@libs/core/event-store/lib/adapter/mongo-store';
import { AuthService } from 'apps/auth/src/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from 'libs/redis/src/redis.module';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { EKafkaGroup, EMicroservice } from '@libs/common/interfaces';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { HelperHashService } from '@libs/common/helper/services/helper.hash.service';
import { DatabaseModule } from '@libs/common/shared/Database.module';
import { RequestStorageMiddleware } from '@libs/common/shared/RequestStorageMiddleware';
import { CategoryProductEntity } from './infrastructure/entity/category.entity';
import { MongoClient } from 'mongodb';
import { InjectionToken } from './application/InjectionToken';
import { CategoryRepositoryImplements } from './infrastructure/CategoryRepositoryImplements';
import { CommandHandlers } from './application/command/handler/index';
import { WriteConnection } from '@libs/common/shared/Database.module';
import { AddCategoryEvent } from '../category/domain/event/AddCategoryEvent';
import { EventsHandlers } from './application/event/index';
import { ProductController } from './interface/category.controller';
import { CategoryFactory } from './domain/CategoryFactory';
import { CategoryQueryImplement } from './infrastructure/query/CategoryImplement';
import { QueryHandlers } from './application/query/handler/index';
const infrastructure: Provider[] = [
  {
    provide: InjectionToken.CATEGORY_REPOSITORY,
    useClass: CategoryRepositoryImplements,
  },
  {
    provide: InjectionToken.CATEGORY_QUERY,
    useClass: CategoryQueryImplement,
  },
];
@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectionDto, CategoryProductEntity]),
    JwtModule.register({}),
    CqrsModule,
    // DatabaseModule,
    // ClientsModule.register([
    //   {
    //     name: EMicroservice.GATEWAY_AUTH_SERVICE,
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: EMicroservice.GATEWAY_AUTH_SERVICE,
    //         brokers: [process.env.KAFKA_HOST],
    //       },
    //       consumer: {
    //         groupId: EKafkaGroup.AUTH_GROUP,
    //       },
    //     },
    //   },
    // ]),
    RedisModule,
    EventStoreModule.registerFeature({
      featureStreamName: CONSTANTS.STREAM_NAME.CATEGORY,
      subscriptions: [
        {
          type: EventStoreSubscriptionType.CatchUp,
          stream: CONSTANTS.STREAM_NAME.CATEGORY,
          resolveLinkTos: true, // Default is true (Optional)
          lastCheckpoint: 0, // Default is 0 (Optional)
        },
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: CONSTANTS.STREAM_NAME.CATEGORY,
          persistentSubscriptionName:
            CONSTANTS.STREAM_NAME.CATEGORY + '-' + process.env.PORT,
          resolveLinkTos: true, // Default is true (Optional)
        },
      ],
      eventHandlers: {
        // Warning: add event handles of token or another module can make duplicate write event
        ...CategoryModule.eventHandlers,
      },
    }),
  ],
  controllers: [ProductController],
  providers: [
    CommandBus,
    EventBus,
    QueryBus,
    Repository,
    MongoStore,
    EventPublisher,
    HelperDateService,
    HelperHashService,
    ...infrastructure,
    ...CommandHandlers,
    CategoryFactory,
    ...EventsHandlers,
    ...QueryHandlers,
  ],
  exports: [],
})
export class CategoryModule implements OnModuleInit {
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
    this.event$.register(EventsHandlers);
    this.query$.register(QueryHandlers);
    await this.seedProjection();
    // await this.watchUserChanges();
  }

  async seedProjection() {
    const streamName = CONSTANTS.STREAM_NAME.CATEGORY;
    const categoryProjection = await this.projectRepository.findOne({
      where: { streamName },
    });
    if (categoryProjection) {
      await this.projectRepository.save({
        ...categoryProjection,
        expectedVersion: categoryProjection.eventNumber,
      });
    } else {
      await this.projectRepository.save({
        ...categoryProjection,
        eventNumber: 0,
        expectedVersion: CONSTANTS.INIT_EXPECTED_VERSION,
      });
      Logger.log('Seed Projection category success');
    }
  }

  public static eventHandlers = {
    AddCategoryEvent: (streamId, data) => new AddCategoryEvent(streamId, data),
  };
}
