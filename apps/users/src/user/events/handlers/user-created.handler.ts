import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import {
  UserCreatedEvent,
  UserCreatedSuccessEvent,
} from '../impl/user-created.event';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../database/entities/users.dto';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { UserVerifyStatus } from '../../constants/user.enum.constant';
import { AuthService } from 'apps/auth/src/auth.service';
import { TokenDto } from '../../database/entities/token.dto';
import { IAuthPassword } from '@libs/common/interfaces/auth.interface';
import { Transactional } from '@libs/common/shared/Transaction';
@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    @InjectRepository(UserDto)
    private readonly userRepository: Repository<UserDto>,
    private readonly eventBus: EventBus,
    private readonly repository: UserRepository,
    private readonly authService: AuthService,
    @InjectRepository(TokenDto)
    private readonly tokenRepository: Repository<TokenDto>,
  ) {}

  // @Transactional()
  async handle(event: UserCreatedEvent) {
    Logger.log('UserCreatedEvent');
    const { streamId, userDto } = event;
    const userId = userDto._id;
    const user = JSON.parse(JSON.stringify(userDto));

    /**
     * Create email verify token
     */
    const email_verify_token = this.authService.signEmailVerifyToken({
      user_id: userId,
      verify: UserVerifyStatus.Unverified,
    });
    const passwordAuth: Promise<IAuthPassword> = this.repository.createPassword(
      user.password,
    );
    user.password = (await passwordAuth).passwordHash;
    user.password_created = (await passwordAuth).passwordCreated;
    user.password_expires = (await passwordAuth).passwordExpired;
    // await this.userRepository.save(user);
    const [access_token, refresh_token] =
      await this.repository.signAccessAndRefreshToken({
        userId,
        verify: UserVerifyStatus.Unverified,
      });

    console.log('access_token', access_token, 'refresh_token', refresh_token);
    const decode = await this.repository.decodeRefreshToken(refresh_token);
    const { iat, exp } = decode;
    await this.tokenRepository.save({
      token: refresh_token,
      userId,
      iat,
      exp,
    });
    this.eventBus.publish(
      new UserCreatedSuccessEvent(streamId, userDto, email_verify_token),
    );
  }
}

@EventsHandler(UserCreatedSuccessEvent)
export class UserCreatedSuccessHandler
  implements IEventHandler<UserCreatedSuccessEvent>
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  handle(event: UserCreatedSuccessEvent) {
    console.log('User created Success');
  }
}
