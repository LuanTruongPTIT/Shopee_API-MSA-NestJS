import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailCommand } from '../impl/verify-email.command.impl';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/userRepository';
import { InjectionToken } from '../../InjectionToken';
@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler
  implements ICommandHandler<VerifyEmailCommand, IResponse>
{
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: VerifyEmailCommand): Promise<IResponse> {
    let { id } = command;
    id = id.replace(/"/g, '');
    await this.userRepository.verifyEmail(id);
    return {
      data: {
        message: 'Verify Email is succcess',
        statusCode: 200,
      },
    };
  }
}
