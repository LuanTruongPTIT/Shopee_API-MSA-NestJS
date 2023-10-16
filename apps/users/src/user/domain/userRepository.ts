import { IAuthPassword } from '../interface/user.interface';
import { UserCreateDto } from '@libs/common/dto/users/user.create.dto';
import { UserEntity } from '../infrastructure/entity/user.entity';
export interface UserRepository {
  exist: (data: Record<string, any>) => Promise<boolean>;
  createPassword: (password: string) => Promise<IAuthPassword>;
  createSalt: (length: number) => Promise<string>;
  create: (
    {
      firstName,
      lastName,
      email,
      mobileNumber,
      role,
      signUpFrom,
      _id,
    }: UserCreateDto,
    { passwordExpired, passwordHash, salt, passwordCreated }: IAuthPassword,
  ) => Promise<UserEntity>;
}
