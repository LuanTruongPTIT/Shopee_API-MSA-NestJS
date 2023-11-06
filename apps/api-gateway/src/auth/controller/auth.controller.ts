import {
  EKafkaMessage,
  EMicroservice,
} from '@libs/common/interfaces/kafka.interface';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  OnModuleInit,
  Post,
  Get,
} from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';
import { UserAuthInfoDoc, UserAuthLoginDoc } from '../docs/user.auth.doc';
import { UserLoginSerialization } from '@libs/common/serializations/user.login.serialization';
import { Response } from '@libs/common/response/decorators/response.decorator';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import {
  AuthJwtAccessProtected,
  AuthJwtPayload,
} from '../decorators/auth.jwt.decorator';
import { AuthAccessPayloadSerialization } from '@libs/common/serializations/auth.access-payload.serialization';
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

  @UserAuthLoginDoc()
  @Response('user.login', {
    serialization: UserLoginSerialization,
  })
  @HttpCode(HttpStatus.OK)
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

  @UserAuthInfoDoc()
  @Response('user.info', { serialization: AuthAccessPayloadSerialization })
  @AuthJwtAccessProtected()
  @Get('/info')
  async info(
    @AuthJwtPayload<AuthAccessPayloadSerialization>()
    payload: AuthAccessPayloadSerialization,
  ): Promise<IResponse> {
    return { data: payload };
  }
}
