import { ICommand } from '@nestjs/cqrs';
import { ENUM_USER_SIGN_UP_FROM } from '../../../constants/user.enum';

export class CreateUserCommand implements ICommand {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly mobileNumber: string,
    readonly email: string,
    readonly role: string,
    readonly password: string,
    readonly signUpFrom: ENUM_USER_SIGN_UP_FROM,
  ) {}
}
