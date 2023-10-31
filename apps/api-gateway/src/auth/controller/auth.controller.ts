import {
  EKafkaMessage,
  EMicroservice,
} from '@libs/common/interfaces/kafka.interface';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_AUTH_SERVICE)
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_LOGIN);
    await this.clientKafka.connect();
  }

  @Post('/signin')
  async SignIn(@Body() data: UserLoginDto) {
    return firstValueFrom(
      this.clientKafka
        .send(EKafkaMessage.REQUEST_LOGIN, JSON.stringify(data))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }
}
