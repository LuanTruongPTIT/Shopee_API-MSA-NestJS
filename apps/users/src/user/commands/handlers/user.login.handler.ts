import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../impl/user.login.command';
import { Logger } from '@nestjs/common';

@CommandHandler(LoginUserCommand)
export class UserLoginHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute(command: LoginUserCommand) {
    Logger.log('Async Login....');
    const { streamId, userLoginDto } = command;
    console.log(userLoginDto);
  }
}
