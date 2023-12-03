import { EventStoreModule } from '@libs/common/core/eventstore/eventstore.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { CategoryRepositoryModule } from './domain/repository/Category.repository.module';
import { CategoryService } from './infrastructure/services/category.service';
import { CategoryController } from './infrastructure/controller/category.controller';
import { EventStore } from '@libs/common/core/eventstore/eventstore';
import { categoryEventHandlers } from './domain/event';
import { CategoryFactory } from './domain/factory/Category.factory';
import {
  CommandBus,
  CqrsModule,
  EventBus,
  EventPublisher,
  QueryBus,
} from '@nestjs/cqrs';
import { CommandHandlers } from './application/handler';
import { CategoryProviders } from './infrastructure/provider/category.provider';
import { EventHandlersProjectionCategory } from './infrastructure/read-model/projection';
import { HelperModule } from '@libs/common/helper/helper.module';
import { AttributeCategoryFactory } from './domain/factory/Attribute-category.factory';
import { AtrtributeCategoryProviders } from './infrastructure/provider/attribute-category.provider';
import { AttributeCategoryService } from './infrastructure/services/attribute-category.service';
import { QueryHandlers } from './application/query/handler';

@Module({
  imports: [
    EventStoreModule.forRoot(),
    CqrsModule,
    CategoryRepositoryModule,
    HelperModule,
  ],
  providers: [
    CategoryService,
    AttributeCategoryService,
    EventPublisher,
    CommandBus,
    EventBus,
    ...CommandHandlers,
    ...CategoryProviders,
    CategoryFactory,
    ...EventHandlersProjectionCategory,
    AttributeCategoryFactory,
    ...AtrtributeCategoryProviders,
    ...QueryHandlers,
  ],
  controllers: [CategoryController],
})
export class CategoryModule implements OnModuleInit {
  constructor(
    private readonly eventStore: EventStore,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly query$: QueryBus,
  ) {}

  async onModuleInit() {
    this.command$.register(CommandHandlers);
    this.event$.register(EventHandlersProjectionCategory);
    this.eventStore.addEventHandlers(categoryEventHandlers);
    this.query$.register(QueryHandlers);
    // await this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    // this.event$.publisher = this.eventStore;
  }
}
