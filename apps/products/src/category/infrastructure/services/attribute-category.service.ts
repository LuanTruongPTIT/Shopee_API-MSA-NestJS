import { Injectable } from '@nestjs/common';
import { IAttributeCategoryService } from '../../domain/interfaces/attribute-category.service.interface';
import { AttributeCategoryRepository } from '../../domain/repository/attribute-category.repository';

@Injectable()
export class AttributeCategoryService implements IAttributeCategoryService {
  constructor(
    private readonly attributeCategoryRepo: AttributeCategoryRepository,
  ) {}

  async checkCategoryAncestors(
    category_parent_id: Record<string, any>,
  ): Promise<boolean> {
    const exist = await this.attributeCategoryRepo.findOne(category_parent_id);
    const result = !!exist;
    return result;
  }
}
