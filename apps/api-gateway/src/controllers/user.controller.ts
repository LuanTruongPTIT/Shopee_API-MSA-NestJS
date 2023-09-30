import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
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
  ApiParam,
  ApiNotFoundResponse,
  ApiBody,
  ApiOkResponse,
  ApiConflictResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthJwtAccessProtected } from '../decorators/user.decorator';
import { checkNumberLoginFail } from '../guards/checkNumberLoginFail.guard';
import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';
import { UserSignUpDoc } from '../decorators/user.docs.decorator';
import { Response } from '../common/response/decorators/response.decorator';
@ApiTags('Users')
@Controller('/users')
export class UserController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_USER_SERVICE)
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_CREATE_USER);
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_VERIFY_EMAIL);
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_LOGIN);
    await this.clientKafka.connect();
  }

  // @ApiOperation({
  //   summary: 'Login',
  //   description: 'Login shopee',
  //   operationId: 'login',
  // })
  // @ApiConflictResponse({
  //   status: 403,
  //   description: 'Bad request',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'object',
  //         properties: {
  //           message: {
  //             type: 'string',
  //             example: ['Email is exist', 'Mobile number is exist'],
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // @ApiOkResponse({
  //   status: 200,
  //   description: 'Create user success',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'object',
  //         properties: {
  //           message: {
  //             type: 'string',
  //             example: 'Create user success',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   type: UserDto,
  // })
  @UserSignUpDoc()
  @Response('user.signUp')
  @Post('/create-user')
  async createUser(@Body() data: UserDto) {
    return await firstValueFrom(
      this.clientKafka
        .send(EKafkaMessage.REQUEST_CREATE_USER, JSON.stringify(data))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }

  @ApiOperation({
    summary: 'Verify Email',
    description: 'Verify email when user click',
    operationId: 'Verify email user',
  })
  // @ApiHeader({
  //   name: 'Authorization',
  //   description: 'Bearer access token',
  //   required: true,
  // })
  @ApiBearerAuth('token')
  @ApiHeader({
    name: 'userId',
    description: 'User ID',
  })
  @ApiNotFoundResponse({
    status: 400,
    description: 'Token is not valid',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Invalid Token',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User Verify email success',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'User Verify email success',
            },
          },
        },
      },
    },
  })
  // @UseGuards(TokenPayloadCheckExist, AuthJwtAccessGuard)
  @AuthJwtAccessProtected()
  @Get('/email-verifications/:token')
  async sendVervifyEmail(@Param('token') token: string) {
    return firstValueFrom(
      this.clientKafka
        .send(EKafkaMessage.REQUEST_VERIFY_EMAIL, JSON.stringify(token))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }

  @UseGuards(checkNumberLoginFail)
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
