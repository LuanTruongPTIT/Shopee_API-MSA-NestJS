import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command.impl';
import { ConflictException, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserRepository } from '../../../domain/userRepository';
import { InjectionToken } from '../../InjectionToken';
import {
  ENUM_USER_SIGN_UP_FROM,
  ENUM_USER_STATUS_CODE_ERROR,
} from '../../../constants/user.enum';
import { UserFactory } from '../../../domain/user.factory';
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  async execute(command: CreateUserCommand) {
    const { email, mobileNumber, ...body } = command;

    const promises: Promise<any>[] = [this.userRepository.exist({ email })];
    if (mobileNumber) {
      promises.push(this.userRepository.exist({ mobileNumber }));
    }
    const [emailExist, mobileNumberExist] = await Promise.all(promises);
    if (emailExist) {
      throw new RpcException(
        new ConflictException({
          statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
          message: 'user.error.emailExist',
        }),
      );
    }
    if (mobileNumberExist) {
      throw new RpcException(
        new ConflictException({
          statusCode:
            ENUM_USER_STATUS_CODE_ERROR.USER_MOBILE_NUMBER_EXIST_ERROR,
          message: 'user.error.mobileNumberExist',
        }),
      );
    }

    const password = await this.userRepository.createPassword(body.password);
    await this.userRepository.create(
      {
        _id: body._id,
        email,
        mobileNumber,
        ...body,
        signUpFrom: ENUM_USER_SIGN_UP_FROM.PUBLIC,
      },
      password,
    );
    const user = this.userFactory.create({
      email,
      id: body._id,
      tokenEmail: 'kfkfkfk',
    });
    user.open();

    user.commit();
  }
}
