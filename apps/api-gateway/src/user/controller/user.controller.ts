import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Request,
  Put,
} from '@nestjs/common';
import {
  EMicroservice,
  EKafkaMessage,
} from '@libs/common/interfaces/kafka.interface';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { UserSignUpDto } from '@libs/common/dto/users/user.sign-up.dto';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import {
  UserSignUpDoc,
  VerifyEmailDoc,
} from '../decorators/user.docs.decorator';
import { Response } from '@libs/common/response/decorators/response.decorator';
import { TokenEmailUserProtected } from '../decorators/user.decorator';
import { ConfigService } from '@nestjs/config';
import { TokenVerifyEmailDto } from '@libs/common/dto/users/user.verify.email.dto';
import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';
@ApiTags('User')
@Controller('/user')
export class UserController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_USER_SERVICE)
    private readonly clientKafka: ClientKafka,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_CREATE_USER);
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_VERIFY_EMAIL);
    this.clientKafka.subscribeToResponseOf(EKafkaMessage.REQUEST_LOGIN);
    await this.clientKafka.connect();
  }

  @UserSignUpDoc()
  @Response('user.signUp')
  @Post('/create-user')
  async createUser(@Body() data: UserSignUpDto) {
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

  @VerifyEmailDoc()
  @Response('user.verify.email')
  @TokenEmailUserProtected()
  @Put('/email-verifications/')
  async sendVervifyEmail(
    @Body() token: TokenVerifyEmailDto,
    @Request() request,
  ) {
    const user_id = request.user._id;
    console.log('user_id', user_id);
    return firstValueFrom(
      this.clientKafka
        .send(EKafkaMessage.REQUEST_VERIFY_EMAIL, JSON.stringify(user_id))
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }
}
