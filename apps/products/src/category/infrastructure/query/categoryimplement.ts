import { Injectable } from '@nestjs/common';
import { CategoryQuery } from '../../application/query/categoryquery';
import { CategoryRepository } from '../../domain/repository/Category.repository';
import { CategoryDoc } from '../read-model/schema/category.schema';

@Injectable()
export class CategoryQueryImplement implements CategoryQuery {
  constructor(private readonly categoryRepo: CategoryRepository) {}
  async getAllCategory(): Promise<Array<any>> {
    const parent = await this.categoryRepo.findAll();

    return parent;

    // return parent;
  }

  async getCategoryChildByPrimary(
    field: string,
    category_parent_id: string,
  ): Promise<CategoryDoc[]> {
    const categoryChild = await this.categoryRepo.findAllByField(field, {
      includeId: [category_parent_id],
    });
    return categoryChild;
  }
}
