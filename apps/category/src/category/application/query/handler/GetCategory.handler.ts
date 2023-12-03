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
    const primaryCategorys = await this.categoryQuery.getAllCategory();
    const dataMap = new Map();
    primaryCategorys.forEach((primary) => {
      dataMap.set(primary._id, { ...primary, category_children: [] });
    });
    const rootCategories: GetCategoryResult[] = [];
    dataMap.forEach((item, id) => {
        const children = await this.
    })
    return rootCategories;
  }
}
