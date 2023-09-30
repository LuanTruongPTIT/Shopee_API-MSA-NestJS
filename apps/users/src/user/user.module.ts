import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
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
import {
  Collection,
  DataSource,
  Db,
  Repository,
  getMetadataArgsStorage,
  getMongoRepository,
} from 'typeorm';
import { ProjectionDto } from '@libs/core/event-store/lib/adapter/projection.dto';
import { UserService } from './services/users.service';
import {
  UserCreatedEvent,
  UserCreatedSuccessEvent,
} from './events/impl/user-created.event';
import { EventStoreSubscriptionType } from '@libs/core/event-store/lib/contract';
import { UserRepository } from './repository/user.repository';
import { EventsHandlers } from './events/handlers/index';
import { MongoStore } from '@libs/core/event-store/lib/adapter/mongo-store';
import { AuthModule } from 'apps/auth/src/auth.module';
import { AuthService } from 'apps/auth/src/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from 'libs/redis/src/redis.module';
import { UsersSagas } from './sagas/user.saga';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EKafkaGroup, EMicroservice } from '@libs/common/interfaces';
import { TokenDto } from './database/entities/token.dto';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { HelperHashService } from '@libs/common/helper/services/helper.hash.service';
import { DatabaseModule } from '@libs/common/shared/Database.module';
import { RequestStorageMiddleware } from '@libs/common/shared/RequestStorageMiddleware';

import { MongoClient } from 'mongodb';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserDto, ProjectionDto, TokenDto]),
    JwtModule.register({}),
    CqrsModule,
    // DatabaseModule,
    ClientsModule.register([
      {
        name: EMicroservice.GATEWAY_AUTH_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: EMicroservice.GATEWAY_AUTH_SERVICE,
            brokers: [process.env.KAFKA_HOST],
          },
          consumer: {
            groupId: EKafkaGroup.AUTH_GROUP,
          },
        },
      },
    ]),
    RedisModule,
    AuthModule,
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
    AuthService,
    UsersSagas,
    HelperDateService,
    HelperHashService,
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
    @InjectRepository(UserDto)
    private readonly userRepository: Repository<UserDto>,
  ) {}

  async onModuleInit() {
    this.command$.register(CommandHandlers);
    this.event$.register(EventsHandlers);
    this.event$.registerSagas([UsersSagas]);
    this.event$.publisher = this.eventStore;
    await this.seedProjection();
    await this.watchUserChanges();
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

  public async watchUserChanges() {
    const mongoUrl = 'mongodb://localhost:27020/test?directConnection=true';
    const client = new MongoClient(mongoUrl);

    try {
      await client.connect();
      console.log('Connected to MongoDB');

      const db = client.db('users');
      const usersCollection = db.collection('users');

      const changeStream = usersCollection.watch();
      changeStream.on('change', (change) => {
        // console.log('User Change:', change);
        // Xử lý sự thay đổi ở đây
      });

      changeStream.on('error', (error) => {
        console.error('User Change Stream Error:', error);
      });
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }

  public static eventHandlers = {
    UserCreatedEvent: (streamId, data) => new UserCreatedEvent(streamId, data),
    UserCreatedSuccessEvent: (streamId, data, tokenEmail) =>
      new UserCreatedSuccessEvent(streamId, data, tokenEmail),
  };
}
