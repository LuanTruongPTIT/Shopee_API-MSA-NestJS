import { IAuthPassword } from '../interface/user.interface';

import { IDatabaseExistOptions } from '@libs/common/database_mongoose/interfaces/database.interface';

// import { UserCreateDto } from '@libs/common/dto/users/user.create.dto';
export interface UserRepository {
  exist: (
    data: Record<string, any>,
    options?: IDatabaseExistOptions,
  ) => Promise<boolean>;
  createPassword: (password: string) => Promise<IAuthPassword>;
  createSalt: (length: number) => Promise<string>;
  // create: (data: UserCreateDto) => Promise<void>;
}
