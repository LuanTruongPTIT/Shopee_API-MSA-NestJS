import { UserRepository } from '../../repository/user.repository';
import { CreateUserCommand } from '../impl/create-user.command';
import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
@CommandHandler(CreateUserCommand)
export class CreatedUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateUserCommand) {
    Logger.log('Async CreateUserHandler.... ');
    const { streamId, userDto } = command;
    const user = this.publisher.mergeObjectContext(
      await this.repository.createUser(streamId, userDto),
    );
    user.commit();
    return user;
  }
}
