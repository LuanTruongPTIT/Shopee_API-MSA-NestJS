import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AddCategoryEvent } from '../../domain/event/AddCategoryEvent';
import { Logger } from '@nestjs/common';
@EventsHandler(AddCategoryEvent)
export class AddCategoryHandler implements IEventHandler<AddCategoryEvent> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  handle(event: AddCategoryEvent) {
    Logger.log('AddCategoryEvent');
    // console.log(event);
  }
}
