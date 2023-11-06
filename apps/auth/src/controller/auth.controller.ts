import {
  Controller,
  Body,
  Logger,
  OnModuleInit,
  Inject,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import {
  EKafkaMessage,
  EMicroservice,
} from '@libs/common/interfaces/kafka.interface';
import { UserLoginDto } from '@libs/common/dto/users/user.login.dto';
import { firstValueFrom } from 'rxjs';
import { RoleResponse } from '@libs/common/dto/roles/role.response';
import { UserResponseKafkaSerialization } from '@libs/common/serializations/user.reponse.kafka.serialization';
import { ConfigService } from '@nestjs/config';
import {
  ENUM_ROLE_STATUS_CODE_ERROR,
  ENUM_USER_STATUS_CODE_ERROR,
} from '../constants/auth.enum';
import { IAuthService } from '../interfaces/auth.service.interface';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CACHE_KEY } from '@libs/common/constants/Key.management';
import { UserVerifyStatus } from '@libs/common/constants/user.enum';
import {
  ENUM_AUTH_LOGIN_FROM,
  ENUM_AUTH_LOGIN_WITH,
} from '@libs/common/constants/auth.enum.constants';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
@Controller()
export class AuthController implements OnModuleInit {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
    @Inject(EMicroservice.USER_SERVICE)
    private readonly clientKafka_user: ClientKafka,
    @Inject(EMicroservice.ROLE_SERVICE)
    private readonly clientKafka_role: ClientKafka,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  async onModuleInit() {
    this.clientKafka_user.subscribeToResponseOf(
      EKafkaMessage.REQUEST_FIND_BY_EMAIL,
    );
    this.clientKafka_role.subscribeToResponseOf(
      EKafkaMessage.REQUEST_FIND_ROLE_BY_ID,
    );
    await this.clientKafka_user.connect();
    await this.clientKafka_role.connect();
  }

  @MessagePattern(EKafkaMessage.REQUEST_LOGIN)
  async signIn(@Body() data: UserLoginDto): Promise<IResponse> {
    const { email, password } = data;
    const user = await firstValueFrom<UserResponseKafkaSerialization>(
      this.clientKafka_user.send(
        EKafkaMessage.REQUEST_FIND_BY_EMAIL,
        JSON.stringify(data.email),
      ),
    );

    console.log(user);

    if (!user) {
      throw new RpcException(
        new NotFoundException({
          statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
          message: 'user.error.notFound',
        }),
      );
    }
    const maxPasswordAttempt: number = this.configService.get<number>(
      'auth.password. maxAttempt',
    );

    const key = `${user._id}:${CACHE_KEY.USER.PASSWORD_ATTEMPT}`;
    let passwordAttempt: number = await this.cache.get(key);

    if (!passwordAttempt) {
      await this.cache.set(key, 0);
    }

    if (passwordAttempt > maxPasswordAttempt) {
      throw new ForbiddenException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_ATTEMPT_MAX_ERROR,
        message: 'user.error.passwordAttemptMax',
      });
    }
    const validate = await this.authService.validateUser(
      password,
      user.password,
    );
    if (!validate) {
      await this.cache.set(key, ++passwordAttempt);
      throw new BadRequestException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NOT_MATCH_ERROR,
        message: 'user.error.passwordNotMatch',
      });
    } else if (user.blocked) {
      throw new ForbiddenException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_BLOCKED_ERROR,
        message: 'user.error.blocked',
      });
    } else if (user.inactivePermanent) {
      throw new ForbiddenException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_INACTIVE_PERMANENT_ERROR,
        message: 'user.error.inactivePermanent',
      });
    } else if (!user.isActive) {
      throw new ForbiddenException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_INACTIVE_ERROR,
        message: 'user.error.inactive',
      });
    } else if (user.verify === UserVerifyStatus.Unverified) {
      throw new ForbiddenException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_IS_NOT_VERIFY,
        message: 'user.error.inactive',
      });
    }
    const role = await firstValueFrom<RoleResponse>(
      this.clientKafka_role.send(
        EKafkaMessage.REQUEST_FIND_ROLE_BY_ID,
        JSON.stringify(user.role),
      ),
    );
    user.role = role as unknown as string;
    if (!role.isActive) {
      throw new ForbiddenException({
        statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_INACTIVE_ERROR,
        message: 'role.error.inactive',
      });
    }
    await this.cache.del(key);

    const payload = await this.authService.payloadSerialization(user);
    const tokenType = await this.authService.getTokenType();
    const loginDate = await this.authService.getLoginDate();
    const payloadAccessToken = await this.authService.createPayloadAccessToken(
      payload,
      {
        loginWith: ENUM_AUTH_LOGIN_WITH.EMAIL,
        loginFrom: ENUM_AUTH_LOGIN_FROM.PASSWORD,
        loginDate,
      },
    );
    const payloadRefreshToken =
      await this.authService.createPayloadRefreshToken(payload._id, {
        loginWith: ENUM_AUTH_LOGIN_WITH.EMAIL,
        loginFrom: ENUM_AUTH_LOGIN_FROM.PASSWORD,
        loginDate,
      });
    const expirationIn = await this.authService.getAccessTokenExpirationTime();
    const accessToken = await this.authService.createAccessToken(
      payloadAccessToken,
    );

    const refreshToken = await this.authService.createRefreshToken(
      payloadRefreshToken,
    );
    await this.authService.create({
      refreshToken,
      userId: user._id,
    });

    return {
      data: {
        expirationIn,
        tokenType,
        type: role.type,
        accessToken,
        refreshToken,
      },
    };
  }
}
