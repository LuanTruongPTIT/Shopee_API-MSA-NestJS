import { CreateUserHandler } from './create-user.handler';
import { VerifyEmailHandler } from './verify-email.handler';
import { UserLoginCommandHandler } from './user-login.handler';
export const CommandHandlers = [
  UserLoginCommandHandler,
  CreateUserHandler,
  VerifyEmailHandler,
];
