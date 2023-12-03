import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoryQuery } from '../impl/get-category.query';
import { CategoryQuery } from '../categoryquery';
import { Inject } from '@nestjs/common';
import { GetCategoryResult } from '../result/get-category.result';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler
  implements IQueryHandler<GetCategoryQuery, GetCategoryResult>
{
  constructor(
    @Inject('CATEGORY_QUERY')
    private readonly categoryQuery: CategoryQuery,
  ) {}

  async execute(): Promise<GetCategoryResult> {
    const categorys = await this.categoryQuery.getAllCategory();

    const rootCategories = [];
    const dataMap = new Map();
    categorys.forEach(async (item) => {
      const category = { ...item._doc, children: [] };
      dataMap.set(item._id, category);
    });
    dataMap.forEach((value) => {
      if (value.parent === null) {
        rootCategories.push(value);
      } else {
        const parent = dataMap.get(value.parent);

        parent.children.push(value);
      }
    });
    console.log('rootCategories', JSON.stringify);
    return rootCategories;
  }
}
