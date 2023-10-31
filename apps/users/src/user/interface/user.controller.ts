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
  EventPattern,
  RpcException,
  Payload,
} from '@nestjs/microservices';
import { CreateUserCommand } from '../application/command/impl/create-user.command.impl';
import { UserSignUpDto } from '@libs/common/dto/users/user.sign-up.dto';
import { firstValueFrom } from 'rxjs';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { FindUserByIdQuery } from '../application/query/impl/FindUserById.impl';
import { VerifyEmailCommand } from '../application/command/impl/verify-email.command.impl';
import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';
import { UserEntity } from '../infrastructure/entity/user.entity';
import { UserLoginCommand } from '../application/command/impl/user.login.command.impl';
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

  @MessagePattern(EKafkaMessage.REQUEST_USER_BY_ID)
  async FindUserById(@Body() data: string): Promise<IResponse> {
    return this.queryBus.execute(new FindUserByIdQuery(data));
  }

  @MessagePattern(EKafkaMessage.REQUEST_VERIFY_EMAIL)
  async VerifyEmail(@Body() data: string): Promise<IResponse> {
    return this.commandBus.execute(new VerifyEmailCommand(data));
  }

  @MessagePattern(EKafkaMessage.REQUEST_LOGIN)
  async signIn(@Body() data: UserLoginDto): Promise<void> {
    const { email, password } = data;
    return this.commandBus.execute(new UserLoginCommand(email, password));
    // return data;
  }
}
