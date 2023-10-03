import { CategoryQuery } from '../../application/query/CategoryQuery';
import { GetCategoryResult } from '../../application/query/GetCategoryResult';
import { dataSource } from '../repository/database/orm.config';
import { CategoryProductEntity } from '../entity/category.entity';

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryQueryImplement implements CategoryQuery {
  constructor(
    @InjectRepository(CategoryProductEntity)
    private readonly categoryProductRepo: Repository<CategoryProductEntity>,
  ) {}

  async getCategoryById(id: string): Promise<GetCategoryResult[]> {
    const category = (await dataSource
      .getMongoRepository(CategoryProductEntity)
      .aggregate([
        {
          $match: {
            ancestors: id.toString(),
          },
        },
        {
          $addFields: {
            ancestorsCount: { $size: '$ancestors' },
          },
        },
        {
          $sort: {
            ancestorsCount: 1,
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            parents: 1,
            is_primary: 1,
          },
        },
      ])
      .toArray()) as unknown as GetCategoryResult[];
    // const result = category.toArray();

    return category;
  }

  async getAllCategory(): Promise<GetCategoryResult[]> {
    type typeofCategory = Pick<
      GetCategoryResult,
      '_id' | 'name' | 'parents' | 'is_primary'
    >;
    const category: typeofCategory[] = await dataSource
      .getMongoRepository(CategoryProductEntity)
      .find({ select: ['_id', 'name', 'parents', 'is_primary'] });
    const dataMap = new Map();
    category.forEach((item) => {
      dataMap.set(item._id, { ...item, category_children: [] });
    });
    const rootCategories: GetCategoryResult[] = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dataMap.forEach((item, id) => {
      const parentCategory = dataMap.get(item.parents);
      if (parentCategory) {
        parentCategory.category_children.push(item);
      } else {
        rootCategories.push(item);
      }
    });
    console.log(JSON.stringify(rootCategories));

    return rootCategories;
  }
}
