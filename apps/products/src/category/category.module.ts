import { EventStoreModule } from '@libs/common/core/eventstore/eventstore.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { CategoryRepositoryModule } from './domain/repository/Category.repository.module';
import { CategoryService } from './infrastructure/services/category.service';
import { CategoryController } from './infrastructure/controller/category.controller';
import { EventStore } from '@libs/common/core/eventstore/eventstore';
import { categoryEventHandlers } from './domain/event';
import { CategoryFactory } from './domain/factory/Category.factory';
import { CommandBus, CqrsModule, EventBus, EventPublisher } from '@nestjs/cqrs';
import { CommandHandlers } from './application/handler';
import { CategoryProviders } from './infrastructure/provider/category.provider';
import { EventHandlersProjectionCategory } from './infrastructure/read-model/projection';

@Module({
  imports: [EventStoreModule.forRoot(), CqrsModule, CategoryRepositoryModule],
  providers: [
    CategoryService,
    EventPublisher,
    CommandBus,
    EventBus,
    ...CommandHandlers,
    ...CategoryProviders,
    CategoryFactory,
    ...EventHandlersProjectionCategory,
  ],
  controllers: [CategoryController],
})
export class CategoryModule implements OnModuleInit {
  constructor(
    private readonly eventStore: EventStore,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
  ) {}

  async onModuleInit() {
    this.command$.register(CommandHandlers);
    this.event$.register(EventHandlersProjectionCategory);
    this.eventStore.addEventHandlers(categoryEventHandlers);
    // await this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    // this.event$.publisher = this.eventStore;
  }
}
