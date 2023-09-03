import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import {
  UserCreatedEvent,
  UserCreatedSuccessEvent,
} from '../impl/user-created.event';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../database/entities/users.dto';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    @InjectRepository(UserDto)
    private readonly userRepository: Repository<UserDto>,
    private readonly eventBus: EventBus,
  ) {}

  async handle(event: UserCreatedEvent) {
    Logger.log('UserCreatedEvent');
    const { streamId, userDto, tokenEmail } = event;
    const user = JSON.parse(JSON.stringify(userDto));
    await this.userRepository.save(user);
    this.eventBus.publish(
      new UserCreatedSuccessEvent(streamId, userDto, tokenEmail),
    );
  }
}

@EventsHandler(UserCreatedSuccessEvent)
export class UserCreatedSuccessHandler
  implements IEventHandler<UserCreatedSuccessEvent>
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  handle(event: UserCreatedSuccessEvent) {
    console.log('User created Success');
  }
}
