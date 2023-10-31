import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserLoginCommand } from '../impl/user.login.command.impl';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { EKafkaMessage, EMicroservice } from '@libs/common/interfaces';
import { UserRepository } from '../../../domain/userRepository';
import { InjectionToken } from '../../InjectionToken';
import {
  ENUM_USER_STATUS_CODE_ERROR,
  UserVerifyStatus,
} from '../../../constants/user.enum';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { RoleResponse } from '@libs/common/dto/roles/role.response';
import { ENUM_ROLE_STATUS_CODE_ERROR } from 'apps/roles/src/role/constants/role.enum.error';
import { UserService } from '../../../domain/user.service';
import {
  ENUM_AUTH_LOGIN_FROM,
  ENUM_AUTH_LOGIN_WITH,
} from '@libs/common/constants/auth.enum.constants';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
@CommandHandler(UserLoginCommand)
export class UserLoginCommandHandler
  implements ICommandHandler<UserLoginCommand, IResponse>, OnModuleInit
{
  constructor(
    @Inject(EMicroservice.ROLE_SERVICE)
    private readonly clientKafka: ClientKafka,
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(
      EKafkaMessage.REQUEST_FIND_ROLE_BY_ID,
    );
    await this.clientKafka.connect();
  }

  async execute(command: UserLoginCommand): Promise<IResponse> {
    const { email, password } = command;

    const user = await this.userRepository.findUser({ email });
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
    if (user.passwordAttempt > maxPasswordAttempt) {
      throw new ForbiddenException({
        statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_ATTEMPT_MAX_ERROR,
        message: 'user.error.passwordAttemptMax',
      });
    }
    const validate: boolean = await this.userRepository.validateUser(
      password,
      user.password,
    );
    if (!validate) {
      await this.userRepository.increasePasswordAttempt(user);

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
      this.clientKafka.send(
        'REQUEST_FIND_ROLE_BY_ID',
        JSON.stringify(user.role),
      ),
    );

    if (!role.isActive) {
      throw new ForbiddenException({
        statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_INACTIVE_ERROR,
        message: 'role.error.inactive',
      });
    }
    await this.userRepository.resetPasswordAttempt(user);

    user.role = role as unknown as string;
    const payload = await this.userService.payloadSerialization(user);
    const tokenType = await this.userService.getTokenType();
    const loginDate = await this.userService.getLoginDate();
    const payloadAccessToken = await this.userService.createPayloadAccessToken(
      payload,
      {
        loginWith: ENUM_AUTH_LOGIN_WITH.EMAIL,
        loginFrom: ENUM_AUTH_LOGIN_FROM.PASSWORD,
        loginDate,
      },
    );
    const payloadRefreshToken =
      await this.userService.createPayloadRefreshToken(payload._id, {
        loginWith: ENUM_AUTH_LOGIN_WITH.EMAIL,
        loginFrom: ENUM_AUTH_LOGIN_FROM.PASSWORD,
        loginDate,
      });
    const expirationIn = await this.userService.getAccessTokenExpirationTime();
    const accessToken = await this.userRepository.createAccessToken(
      payloadAccessToken,
    );

    const refreshToken = await this.userRepository.createRefreshToken(
      payloadRefreshToken,
    );
    await this.userRepository.save({
      UserId: user._id,
      RefreshToken: refreshToken,
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
