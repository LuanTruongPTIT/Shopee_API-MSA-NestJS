import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '../impl/FindUserById.impl';
import { FindUserByIdResult } from '../result/FindUserByIdResult';
import { UserQuery } from '../UserQuery';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../InjectionToken';
@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler
  implements IQueryHandler<FindUserByIdQuery, FindUserByIdResult | null>
{
  constructor(
    @Inject(InjectionToken.USER_QUERY)
    private readonly userQuery: UserQuery,
  ) {}

  async execute(query: FindUserByIdQuery): Promise<FindUserByIdResult> {
    let { id } = query;
    id = id.replace(/"/g, '');
    const data = await this.userQuery.findUserById(id);
    return data;
  }
}
