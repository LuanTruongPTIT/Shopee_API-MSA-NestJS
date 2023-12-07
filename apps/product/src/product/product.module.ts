import { CONSTANTS } from '@libs/common/constants/constants';
import { ProjectionDto } from '@libs/core/event-store/lib/adapter/projection.dto';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { EventStoreModule } from '@libs/core/event-store/lib/event-store.module';
import { Repository } from 'typeorm';
import { EventStoreSubscriptionType } from '@libs/core/event-store/lib/contract';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
@Module({
  imports: [],
  providers: [],
})
export class ProductModule {}
