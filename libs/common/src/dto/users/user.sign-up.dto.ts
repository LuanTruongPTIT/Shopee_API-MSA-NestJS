import { OmitType } from '@nestjs/swagger';
import { UserCreateDto } from './user.create.dto';
export class UserSignUpDto extends OmitType(UserCreateDto, [
  'role',
  'signUpFrom',
  'verify',
  'email_verify_token',
] as const) {}
