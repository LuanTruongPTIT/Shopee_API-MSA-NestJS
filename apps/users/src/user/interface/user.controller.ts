import { EKafkaMessage, EMicroservice } from '@libs/common/interfaces';
import {
  Body,
  ConflictException,
  Controller,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ClientKafka,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { CreateUserCommand } from '../application/command/impl/create-user.command.impl';
import { UserSignUpDto } from '@libs/common/dto/users/user.sign-up.dto';
import { firstValueFrom } from 'rxjs';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
@Controller()
export class UserController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.ROLE_SERVICE)
    private readonly clientKafka: ClientKafka,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(
      EKafkaMessage.REQUEST_FIND_ROLE_BY_NAME,
    );
    await this.clientKafka.connect();
  }

  @MessagePattern(EKafkaMessage.REQUEST_CREATE_USER)
  async signUp(@Body() data: UserSignUpDto): Promise<IResponse> {
    const role = await firstValueFrom(
      this.clientKafka.send(
        'REQUEST_FIND_ROLE_BY_NAME',
        JSON.stringify('user'),
      ),
    );
    console.log(role);
    if (!role) {
      throw new RpcException(new ConflictException('role is not exist'));
    }
    const command = new CreateUserCommand(
      data.firstName,
      data.lastName,
      data.mobileNumber,
      data.email,
      data.password,
      data._id,
      role,
    );
    const result = await this.commandBus.execute(command);
    return result;
  }
}
