/* eslint-disable @typescript-eslint/no-empty-function */
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
  UseGuards,
  Res,
} from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';
import {
  UserAuthInfoDoc,
  UserAuthLoginDoc,
  UserAuthLoginGooglerDoc,
  UserAuthRefreshDoc,
} from '../docs/user.auth.doc';
import { UserLoginSerialization } from '@libs/common/serializations/user.login.serialization';
import { Response } from '@libs/common/response/decorators/response.decorator';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import {
  AuthJwtAccessProtected,
  AuthJwtPayload,
  AuthJwtRefreshProtected,
  AuthJwtToken,
  UserAuthProtected,
} from '../decorators/auth.jwt.decorator';
import { AuthAccessPayloadSerialization } from '@libs/common/serializations/auth/auth.access-payload.serialization';
import { AuthRefreshPayloadSerialization } from '@libs/common/serializations/auth/auth.refresh-payload.serialization';
import { UserGetSerialization } from '@libs/common/serializations/user.get.serialization';
import { GetUser, UserProtected } from '../../user/decorators/user.decorator';
import { UserRefreshSerialization } from '@libs/common/serializations/auth/user.refresh.serialization';
import { GoogleAuthGuard } from '../guards/google-authentication/auth.google-strategry.guard';
import { UserResponseLoginSerialization } from '@libs/common/serializations/user.response.login.serialization';
import { Response as ExpressResponse } from 'express';
@ApiTags('Auth')
@Controller('/auth')
export class AuthController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_AUTH_SERVICE)
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_LOGIN);
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_REFRESH_TOKEN);
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_LOGOUT);
    await this.clientKafka.connect();
  }

  @UserAuthLoginDoc()
  @Response('user.login', {
    serialization: UserLoginSerialization,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async SignIn(
    @Body() data: UserLoginDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const result = await firstValueFrom(
      this.clientKafka
        .send(EKafkaMessage.REQUEST_LOGIN, JSON.stringify(data))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    const { accessToken } = result.data;
    console.log('result', result);
    // const accessToken = result.accessToken;
    res.cookie('csrf_token', accessToken, {
      maxAge: 365 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });
    return result;
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

  @UserAuthRefreshDoc()
  @Response('user.refresh', { serialization: UserRefreshSerialization })
  @UserAuthProtected()
  @UserProtected()
  @AuthJwtRefreshProtected()
  @Post('/refresh')
  async refresh(
    @AuthJwtToken() refreshToken: string,
    @AuthJwtPayload<AuthRefreshPayloadSerialization>()
    refreshPayload: AuthRefreshPayloadSerialization,
    @GetUser() user: UserGetSerialization,
  ) {
    const data = { refreshToken, refreshPayload, user };

    return firstValueFrom(
      this.clientKafka
        .send(EKafkaMessage.REQUEST_REFRESH_TOKEN, JSON.stringify(data))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }

  // @UserAuthLoginGooglerDoc()
  @UseGuards(GoogleAuthGuard)
  @Get('/login/google')
  async loginGoogle() {}

  @UserAuthProtected()
  @UserProtected()
  @AuthJwtRefreshProtected()
  @Post('/logout')
  async logout(@AuthJwtToken() refreshToken: string): Promise<IResponse> {
    const payload = {
      data: refreshToken,
    };
    return firstValueFrom(
      this.clientKafka
        .send(EKafkaMessage.REQUEST_LOGOUT, JSON.stringify(payload))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }
}
