import { EKafkaMessage } from '@libs/common/interfaces';
import { Body, Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { UserCreateDto } from '@libs/common/dto/users/user.create.dto';
import { CreateUserCommand } from '../application/command/impl/create-user.command.impl';
@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(EKafkaMessage.REQUEST_CREATE_USER)
  async signUp(@Body() data: UserCreateDto) {
    const command = new CreateUserCommand(
      data.email,
      data.firstName,
      data.lastName,
      data.mobileNumber,
      data.password,
      data.role,
      data.signUpFrom,
    );
    await this.commandBus.execute(command);
  }
}
