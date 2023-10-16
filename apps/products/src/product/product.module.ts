import { CONSTANTS } from '@libs/common/constants/constants';
import { ProjectionDto } from '@libs/core/event-store/lib/adapter/projection.dto';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { EventStoreModule } from '@libs/core/event-store/lib/event-store.module';
import { Repository } from 'typeorm';
import { EventStoreSubscriptionType } from '@libs/core/event-store/lib/contract';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectionDto]),
    EventStoreModule.registerFeature({
      featureStreamName: CONSTANTS.STREAM_NAME.PRODUCT,
      subscriptions: [
        {
          type: EventStoreSubscriptionType.CatchUp,
          stream: CONSTANTS.STREAM_NAME.PRODUCT,
          resolveLinkTos: true, // Default is true (Optional)
          lastCheckpoint: 0, // Default is 0 (Optional)
        },
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: CONSTANTS.STREAM_NAME.PRODUCT,
          persistentSubscriptionName:
            CONSTANTS.STREAM_NAME.PRODUCT + '-' + process.env.PORT,
          resolveLinkTos: true, // Default is true (Optional)
        },
      ],
      eventHandlers: {
        // Warning: add event handles of token or another module can make duplicate write event
        // ...UserModule.eventHandlers,
      },
    }),
  ],
  providers: [],
})
export class ProductModule implements OnModuleInit {
  constructor(
    @InjectRepository(ProjectionDto)
    private readonly projectRepository: Repository<ProjectionDto>,
  ) {}

  async onModuleInit() {
    await this.seedProjection();
  }

  async seedProjection() {
    const streamName = CONSTANTS.STREAM_NAME.PRODUCT;
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
      Logger.log('Seed Projection product success');
    }
  }
}
