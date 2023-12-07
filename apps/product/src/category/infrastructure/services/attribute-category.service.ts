import { Injectable } from '@nestjs/common';
import { IAttributeCategoryService } from '../../domain/interfaces/attribute-category.service.interface';
import { AttributeCategoryRepository } from '../../domain/repository/attribute-category.repository';
import { CategoryRepository } from '../../domain/repository/Category.repository';
import { CategoryDoc } from '../read-model/schema/category.schema';

@Injectable()
export class AttributeCategoryService implements IAttributeCategoryService {
  constructor(
    private readonly attributeCategoryRepo: AttributeCategoryRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async checkCategoryAncestors(
    category_parent_id: Record<string, any>,
  ): Promise<boolean> {
    const _id = category_parent_id.category_id;
    const exist = await this.categoryRepo.findOne({
      _id,
    });

    const result = !!exist;
    return result;
  }
}
