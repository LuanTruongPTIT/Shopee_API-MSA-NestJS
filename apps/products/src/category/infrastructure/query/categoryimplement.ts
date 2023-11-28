import { Injectable } from '@nestjs/common';
import { CategoryQuery } from '../../application/query/categoryquery';
import { CategoryRepository } from '../../domain/repository/Category.repository';

@Injectable()
export class CategoryQueryImplement implements CategoryQuery {
  constructor(private readonly categoryRepo: CategoryRepository) {}
  async getAllCategory(): Promise<void> {
    const parent = await this.categoryRepo.
  }
}
