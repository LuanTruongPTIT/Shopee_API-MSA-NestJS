import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import {
  EMicroservice,
  EKafkaMessage,
} from '@libs/common/interfaces/kafka.interface';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { UserDto } from 'apps/users/src/user/database/entities/users.dto';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import {
  ApiSecurity,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UserController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_USER_SERVICE)
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_CREATE_USER);
    await this.clientKafka.connect();
  }

  @ApiHeader({
    name: 'X-MyHeader',
    description: 'Custom header',
  })
  @ApiOperation({ tags: ['Create-user'] })
  @ApiResponse({
    status: 200,
    description: 'Create user success',
    type: UserDto,
  })
  @Post('/create-user')
  async createUser(@Body() data: UserDto) {
    return firstValueFrom(
      this.clientKafka
        .send(EKafkaMessage.REQUEST_CREATE_USER, JSON.stringify(data))
        .pipe(
          catchError((error) =>
            throwError(() => {
              return error.response;
            }),
          ),
        ),
    );
  }
}
