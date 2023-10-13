import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command.impl';
import { ConflictException, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import {
  EKafkaMessage,
  EMicroservice,
} from '@libs/common/interfaces/kafka.interface';
import { firstValueFrom } from 'rxjs';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand>, OnModuleInit
{
  constructor(
    @Inject(EMicroservice.GATEWAY_ROLE_SERVICE)
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(
      EKafkaMessage.REQUEST_FIND_ROLE_BY_NAME,
    );
    this.clientKafka.connect();
  }

  async execute(command: CreateUserCommand) {
    const { role, password, ...body } = command;
    console.log(role);
    const IsRole = await firstValueFrom(
      this.clientKafka.emit(
        EKafkaMessage.REQUEST_FIND_ROLE_BY_NAME,
        JSON.stringify(role),
      ),
    );
    console.log('ISROLE', IsRole);
    // if (!IsRole) {
    //   throw new RpcException(new ConflictException('role is not exist'));
    // }

    console.log('Async execute Command CreateUser');
  }
}
