/* eslint-disable brace-style */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../command/create-category.command';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException, Inject } from '@nestjs/common';
import { ICategoryService } from '../../domain/interfaces/category.service.interface';
import { CategoryFactory } from '../../domain/factory/Category.factory';
import { CATEGORY_PRODUCT_LEVEL } from '@libs/common/constants/category.enum';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand, void>
{
  constructor(
    @Inject('CATEGORY_SERVICE')
    private readonly categoryService: ICategoryService,
    private readonly categoryFactory: CategoryFactory,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<void> {
    const { _id, category_name, file, level, category_parent_id } = command;
    console.log(_id, category_name, file, level, category_parent_id);
    let isParent = true;
    const exist = await this.categoryService.checkCategoryParentExist(
      category_name,
    );
    if (exist) {
      throw new RpcException(new BadRequestException('category.error.isExist'));
    }

    if (level !== CATEGORY_PRODUCT_LEVEL.categoryprimary) {
      isParent = false;
    }

    let parent_id: Array<string>;
    let parent: string = null;
    if (category_parent_id !== '') {
      parent_id = category_parent_id.split(',');
      parent = parent_id[parent_id.length - 1];
    }

    const category = this.categoryFactory.create({
      _id,
      category_name,
      isParent,
      parent_id: category_parent_id !== '' ? parent_id : null,
      level,
      isActive: true,
      file,
      parent,
    });

    category.create();
    category.commit();
  }
}
