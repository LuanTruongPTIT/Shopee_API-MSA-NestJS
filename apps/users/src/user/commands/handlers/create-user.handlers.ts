import { UserRepository } from '../../repository/user.repository';
import { CreateUserCommand } from '../impl/create-user.command';
import { ICommandHandler, EventPublisher, CommandHandler } from '@nestjs/cqrs';
import { Logger, ConflictException, Inject } from '@nestjs/common';
import { AuthService } from 'apps/auth/src/auth.service';
import { UserVerifyStatus } from '../../constants/user.enum.constant';
import { ERR } from '@libs/common/constants/error';
import { RedisService } from 'libs/redis/src/redis.service';
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
      throw new ConflictException({
        status_Code: ERR.USER_EMAIL_EXIST_ERROR,
        message: 'user.error.emailExist',
      });
    } else if (mobileNumberExist) {
      throw new ConflictException({
        status_cdode: ERR.USER_MOBILE_NUMBER_EXIST_EROR,
        message: 'user.error.mobileNumberExist',
      });
    }
    const email_verify_token = this.authService.signEmailVerifyToken({
      user_id: userId,
      verify: UserVerifyStatus.Unverified,
    });

    // console.log('userId', userId, 'email_verify_token', email_verify_token);
    const user = await this.publisher.mergeObjectContext(
      await this.repository.createUser(streamId, userDto, email_verify_token),
    );
    user.commit();
  }
}
