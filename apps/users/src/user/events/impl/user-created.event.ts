import { IEvent } from '@nestjs/cqrs';
import { UserDto } from '../../database/entities/users.dto';

export class UserCreatedEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly userDto: UserDto,
  ) {}
}
export class UserCreatedSuccessEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly userDto: any,
    public readonly tokenEmail: string,
  ) {}

  checkPassword() {
    console.log();
  }
}
export class UserCreatedFailedEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly userDto: any,
    public readonly error: object,
  ) {}
}
