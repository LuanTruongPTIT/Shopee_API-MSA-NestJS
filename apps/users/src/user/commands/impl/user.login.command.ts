import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';
import { ICommand } from '@nestjs/cqrs';

export class LoginUserCommand implements ICommand {
  constructor(
    public readonly streamId: string,
    public readonly userLoginDto: UserLoginDto,
  ) {}
}
