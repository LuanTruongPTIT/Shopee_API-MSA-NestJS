import { CategoryRepository } from '../domain/CategoryRepository';
import { CategoryProductEntity } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../domain/Category';
import { CategoryProperties } from '../domain/Category';
import { datasource } from './repository/database/orm.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepositoryImplements implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryProductEntity)
    private readonly categoryProductRepo: Repository<CategoryProductEntity>,
  ) {}

  async save(data: Category): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entity = models.map((model) => this.modelToEntity(model));
    await this.categoryProductRepo.save(entity);
  }

  async findPrimaryCategory(id: string): Promise<CategoryProductEntity> {
    const category = this.categoryProductRepo.findOne({ where: { _id: id } });
    return category;
  }

  async findAncestorCategory(parents: string): Promise<string[] | null> {
    const category = await this.categoryProductRepo.findOne({
      where: { parents },
    });

    if (category && category.ancestors) {
      return category.ancestors;
    } else {
      return null;
    }
  }

  private modelToEntity(model: Category): CategoryProductEntity {
    const properties = JSON.parse(JSON.stringify(model)) as CategoryProperties;
    return {
      ...properties,
    };
  }

  async updateAttributeOfCategory(
    category_id: string,
    data: Array<string>,
  ): Promise<void> {
    await datasource
      .getMongoRepository(CategoryProductEntity)
      .updateOne({ _id: category_id }, { $set: { data } });
  }
}
