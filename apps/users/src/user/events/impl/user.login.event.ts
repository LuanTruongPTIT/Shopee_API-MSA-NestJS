import { IEvent } from '@nestjs/cqrs';
import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';
export class UserLoginSuccessEvent implements IEvent {
  constructor(
    private readonly userLoginDto: UserLoginDto,
    private readonly streamId: string,
  ) {}
}
