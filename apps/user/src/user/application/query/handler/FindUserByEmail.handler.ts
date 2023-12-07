import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from '../../../infrastructure/entity/user.entity';
import { FindUserByEmailQuery } from '../impl/FindUserByEmail.impl';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/userRepository';
import { InjectionToken } from '../../InjectionToken';
@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler
  implements IQueryHandler<FindUserByEmailQuery, UserEntity>
{
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(query: FindUserByEmailQuery): Promise<UserEntity> {
    const { email } = query;
    return await this.userRepository.findUser({ email });
  }
}
