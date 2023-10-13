import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateUserSuccessEvent } from '../../domain/event/create-user.event';
import { Logger } from '@nestjs/common';
@EventsHandler(CreateUserSuccessEvent)
export class CreateUserEventSuccessHandler
  implements IEventHandler<CreateUserSuccessEvent>
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  handle(event: CreateUserSuccessEvent) {
    Logger.log('CreateUserEventSuccessHandler');
  }
}
