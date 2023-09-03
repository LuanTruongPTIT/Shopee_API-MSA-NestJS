import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/impl/user-created.event';

export class User extends AggregateRoot {
  // eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
  [x: string]: any;
  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data) {
    this.data = data;
  }

  createUser(streamId: string, tokenEmail: string) {
    this.apply(new UserCreatedEvent(streamId, this.data, tokenEmail));
  }
}
