import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../impl/user.login.command';
import { ForbiddenException, Logger, NotFoundException } from '@nestjs/common';
import { RedisService } from 'libs/redis/src/redis.service';
import { CONSTANTS } from '@libs/common/constants/constants';
import { UserRepository } from '../../repository/user.repository';
import { RpcException } from '@nestjs/microservices';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { TokenDto } from '../../database/entities/token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@CommandHandler(LoginUserCommand)
export class UserLoginHandler
  implements ICommandHandler<LoginUserCommand, IResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly redisService: RedisService,
    private readonly userRepository: UserRepository,
    private readonly helperDataService: HelperDateService,
    @InjectRepository(TokenDto)
    private readonly tokenRepository: Repository<TokenDto>,
  ) {}

  async execute(command: LoginUserCommand): Promise<IResponse> {
    Logger.log('Async Login....');
    const { streamId, userLoginDto } = command;
    const { userId, email, password, verify } = userLoginDto;
    const key = `${CONSTANTS.KEYREDIS.USER}:${userId}`;
    let numberFailLogin = 0;

    /**
     * Check email user
     */
    const user = await this.userRepository.existEmail(email);
    if (!user) {
      numberFailLogin += 1;
      this.userRepository.checkNumberFailLogin({ key, numberFailLogin });
      throw new RpcException(
        new NotFoundException({
          message: 'error.user.email.notfound',
        }),
      );
    }
    /**
     * Check password user
     */
    const checkPassword = this.userRepository.checkPassword(
      password,
      user.password,
    );
    if (checkPassword) {
      numberFailLogin += 1;
      this.userRepository.checkNumberFailLogin({ key, numberFailLogin });
      throw new RpcException(
        new NotFoundException({
          message: 'error.user.password.notMatch',
        }),
      );
    } else if (user.isBlock) {
      throw new RpcException(
        new ForbiddenException({
          messgage: 'error.user.block',
        }),
      );
    } else if (user.isActive) {
      throw new RpcException(
        new ForbiddenException({
          messgage: 'error.user.notActive',
        }),
      );
    }
    // const checkPasswordExpired: Promise<boolean> =
    //   this.userRepository.checkPasswordExpired(user.password_expires);
    // if (checkPasswordExpired) {
    //   throw new RpcException(
    //     new ForbiddenException({
    //       statusCode: 5209,
    //       message: 'user.password.passwordExpired',
    //     }),
    //   );
    // }
    const [accessToken, refreshToken] =
      await this.userRepository.signAccessAndRefreshToken({ userId, verify });
    const decode = await this.userRepository.decodeRefreshToken(refreshToken);
    const [iat, exp] = decode;
    await this.tokenRepository.save({
      token: refreshToken,
      userId,
      iat,
      exp,
    });
    return {
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
}
