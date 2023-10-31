import { ICommand } from '@nestjs/cqrs';

export class UserLoginCommand implements ICommand {
  constructor(readonly email: string, readonly password: string) {}
}
