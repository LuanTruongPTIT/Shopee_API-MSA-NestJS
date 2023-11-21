import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AddCategoryEvent } from '../../../domain/event/create-category.event';
import { EventStore } from '@libs/common/core/eventstore/eventstore';

@EventsHandler(AddCategoryEvent)
export class CreateCategoryProjection
  implements IEventHandler<AddCategoryEvent>
{
  async handle(event: AddCategoryEvent) {
    console.log(event);
  }
}
