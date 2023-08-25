import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../impl/user-created.event';
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
    console.log('Event_User_Created_Handler', event);
  }
}
