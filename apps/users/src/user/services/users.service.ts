import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserDto } from '../database/entities/users.dto';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { LoginUserCommand } from '../commands/impl/user.login.command';
import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}

  async createUser(streamId: string, userDto: UserDto) {
    return await this.commandBus.execute(
      new CreateUserCommand(streamId, userDto),
    );
  }

  async signin(streamId: string, userLoginDto: UserLoginDto) {
    return await this.commandBus.execute(
      new LoginUserCommand(streamId, userLoginDto),
    );
  }
}
