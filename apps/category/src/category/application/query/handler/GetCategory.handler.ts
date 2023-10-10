/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-empty-function */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetCategoryQuery } from '../impl/GetCategory.query';
import { GetCategoryResult } from '../GetCategoryResult';
import { CategoryQuery } from '../CategoryQuery';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../InjectionToken';
@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler
  implements IQueryHandler<GetCategoryQuery, GetCategoryResult[]>
{
  constructor(
    @Inject(InjectionToken.CATEGORY_QUERY)
    private readonly categoryQuery: CategoryQuery,
  ) {}

  async execute(): Promise<GetCategoryResult[]> {
    const result = this.categoryQuery.getAllCategory();
    return result;
  }
}
