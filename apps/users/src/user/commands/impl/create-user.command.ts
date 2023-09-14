import { ICommand } from '@nestjs/cqrs';
import { UserDto } from '../../database/entities/users.dto';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly streamId: string,
    public readonly userDto: UserDto,
  ) {}
}
