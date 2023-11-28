import { Injectable } from '@nestjs/common';
import { IAttributeCategoryService } from '../../domain/interfaces/attribute-category.service.interface';
import { AttributeCategoryRepository } from '../../domain/repository/attribute-category.repository';

@Injectable()
export class AttributeCategoryService implements IAttributeCategoryService {
  constructor(
    private readonly attributeCategoryRepo: AttributeCategoryRepository,
  ) {}

  async checkCategoryAncestors(
    field: string,
    category_parent_id: Array<string>,
  ): Promise<boolean> {
    const exist = await this.attributeCategoryRepo.existByField(field, {
      includeId: category_parent_id,
    });
    return exist;
  }
}
