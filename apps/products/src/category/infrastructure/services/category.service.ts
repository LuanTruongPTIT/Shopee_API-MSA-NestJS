import { Injectable } from '@nestjs/common';
import { ICategoryService } from '../../domain/interfaces/category.service.interface';
import { CategoryRepository } from '../../domain/repository/Category.repository';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private readonly categgoryRepo: CategoryRepository) {}

  async checkCategoryParentExist(category_name: string): Promise<boolean> {
    const exist = await this.categgoryRepo.exists({ category_name });
    return exist;
  }
}
