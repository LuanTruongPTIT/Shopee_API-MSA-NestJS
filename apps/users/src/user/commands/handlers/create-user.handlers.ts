import { UserRepository } from '../../repository/user.repository';
import { CreateUserCommand } from '../impl/create-user.command';
import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import {
  Logger,
  ConflictException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  HttpException,
} from '@nestjs/common';
import { AuthService } from 'apps/auth/src/auth.service';
import { UserVerifyStatus } from '../../constants/user.enum.constant';
import { ERR } from '@libs/common/constants/error';
import { RedisService } from 'libs/redis/src/redis.service';
import { RpcException } from '@nestjs/microservices';
@CommandHandler(CreateUserCommand)
export class CreatedUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher,
    private readonly authService: AuthService,
    private readonly redisService: RedisService, // @Inject(CACHE_MANAGER) // private readonly cacheManager: Cache,
  ) {}

  async execute(command: CreateUserCommand) {
    Logger.log('Async CreateUserHandler.... ');
    const { streamId, userDto } = command;
    const userId = userDto._id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: Promise<any>[] = [
      this.repository.existEmail(userDto.email),
    ];
    if (userDto.phone_number) {
      promises.push(this.repository.existByMobileNumber(userDto.phone_number));
    }
    const [emailExist, mobileNumberExist] = await Promise.all(promises);

    if (emailExist) {
      throw new RpcException(new ForbiddenException('user.error.emailExist'));
    } else if (mobileNumberExist) {
      throw new RpcException(
        new ForbiddenException('user.error.mobileNumberExist'),
      );
    }
    const user = await this.publisher.mergeObjectContext(
      await this.repository.createUser(streamId, userDto),
    );
    user.commit();
    return user;
  }
}
