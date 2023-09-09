import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Get,
  Param,
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
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_VERIFY_EMAIL);
    await this.clientKafka.connect();
  }

  @ApiOperation({
    summary: 'Login',
    description: 'Login shopee',
    operationId: 'login',
  })
  @ApiConflictResponse({
    status: 403,
    description: 'Bad request',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Email is exist , Mobile number is exist',
            },
          },
        },
      },
    },
  })
  @ApiOkResponse({
    status: 200,
    description: 'Create user success',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Create user success',
            },
          },
        },
      },
    },
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

  @ApiOperation({
    summary: 'Verify Email',
    description: 'Verify email when user click',
    operationId: 'Verify email user',
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
  @Get('/email-verifications/:token')
  async sendVervifyEmail(@Param('token') token: string) {
    return firstValueFrom(
      this.clientKafka
        .send(EKafkaMessage.REQUEST_VERIFY_EMAIL, JSON.stringify(token))
        .pipe(
          catchError((error) =>
            throwError(() => {
              console.log(error);
              return error.response;
            }),
          ),
        ),
    );
  }
}
