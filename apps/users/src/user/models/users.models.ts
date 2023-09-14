import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';
import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/impl/user-created.event';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { UserLoginSuccessEvent } from '../events/impl/user.login.event';
export class User extends AggregateRoot {
  // eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
  [x: string]: any;
  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data) {
    this.data = data;
  }

  createUser(streamId: string) {
    this.apply(new UserCreatedEvent(streamId, this.data));
  }

  signin(streamId: string, userLoginDto: UserLoginDto) {
    this.apply(new UserLoginSuccessEvent(userLoginDto, streamId));
  }
}
