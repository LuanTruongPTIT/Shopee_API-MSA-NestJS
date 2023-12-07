import { Global, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './index';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseOptionModule } from '@libs/common/database_mongoose/database.options.module';
import { DatabaseOptionsService } from '@libs/common/database_mongoose/services/database.options.service';
import { CategoryModule } from './category/category.module';
import databaseConfig from '@libs/common/configs/database.config';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { CategoryRepositoryModule } from './category/domain/repository/Category.repository.module';
import { EventStore } from '@libs/common/core/eventstore/eventstore';
import { EventStoreModule } from '@libs/common/core/eventstore/eventstore.module';
import { CategoryFactory } from './category/domain/factory/Category.factory';
import { RedisModule } from '@libs/common/redis/redis.module';
import { CacheModule } from '@nestjs/cache-manager';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [databaseConfig],
    }),
    EventStoreModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [DatabaseOptionModule],
      inject: [DatabaseOptionsService],
      useFactory: (databaseOptionsService: DatabaseOptionsService) => {
        return databaseOptionsService.createOptions();
      },
    }),
    CategoryModule,
    ProductModule,
    CategoryRepositoryModule,
    CqrsModule,
    RedisModule,
  ],
  controllers: [],
  providers: [
    // EventPublisher,

    // ...CommandHandlers,

    CategoryFactory,
    // CommandBus,
    // EventBus,
    // CategoryRepository,
    // CategoryService,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly event$: EventBus,
    private readonly eventStore: EventStore,
  ) {}

  async onModuleInit() {
    /** ------------ */
    await this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    // this.event$.publisher = this.eventStore;
  }
}
