import { OmitType } from '@nestjs/swagger';
import { UserGetSerialization } from './user.get.serialization';

export class UserResponseKafkaSerialization extends OmitType(
  UserGetSerialization,
  ['role'],
) {
  role: string;
}
