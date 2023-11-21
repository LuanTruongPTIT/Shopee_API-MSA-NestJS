import { OmitType } from '@nestjs/swagger';
import { UserGetSerialization } from './user.get.serialization';

export class UserResponseFindByIdSerialization extends OmitType(
  UserGetSerialization,
  [
    'username',
    'email',
    'mobileNumber',
    'inactivePermanent',
    'inactiveDate',
    'blockedDate',
    'firstName',
    'lastName',
    'photo',
    'password',
    'passwordExpired',
    'passwordCreated',
    'passwordAttempt',
    'signUpDate',
    'signUpFrom',
    'salt',
    'verify',
    'createdDate',
    'updatedDate',
    'deletedAt',
  ],
) {}
