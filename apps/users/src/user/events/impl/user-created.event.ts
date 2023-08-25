import { IEvent } from '@nestjs/cqrs';
import { UserDto } from '../../database/entities/users.dto';

export class UserCreatedEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly userDto: UserDto,
  ) {}
}
