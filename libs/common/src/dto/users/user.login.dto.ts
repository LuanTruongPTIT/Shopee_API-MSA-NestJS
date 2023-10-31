import { PickType } from '@nestjs/swagger';
import { UserCreateDto } from './user.create.dto';
export class UserLoginDto extends PickType(UserCreateDto, [
  'email',
  'password',
] as const) {}
