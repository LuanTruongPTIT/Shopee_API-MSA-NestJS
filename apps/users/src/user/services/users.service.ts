import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserDto } from '../database/entities/users.dto';
import { CreateUserCommand } from '../commands/impl/create-user.command';
@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}
  async createUser(streamId: string, userDto: UserDto) {
    return await this.commandBus.execute(
      new CreateUserCommand(streamId, userDto),
    );
  }
}
