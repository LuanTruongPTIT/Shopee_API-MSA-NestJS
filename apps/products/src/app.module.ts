import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './index';

import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseOptionModule } from '@libs/common/database_mongoose/database.options.module';
import { DatabaseOptionsService } from '@libs/common/database_mongoose/services/database.options.service';
import { CategoryModule } from './category/category.module';
import databaseConfig from '@libs/common/configs/database.config';
import { CategoryProviders } from './category/infrastructure/provider/category.provider';
import { CommandHandlers } from './category/application/handler';
import { EventHandlersProjectionCategory } from './category/infrastructure/read-model/projection';
import { CqrsModule, CommandBus, EventBus, EventPublisher } from '@nestjs/cqrs';
import { CategoryRepositoryModule } from './category/domain/repository/Category.repository.module';
import { CategoryRepository } from './category/domain/repository/Category.repository';
import { EventStore } from '@libs/common/core/eventstore/eventstore';
import { EventStoreModule } from '@libs/common/core/eventstore/eventstore.module';
import { CategoryFactory } from './category/domain/factory/Category.factory';
import { CategoryService } from './category/infrastructure/services/category.service';
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
