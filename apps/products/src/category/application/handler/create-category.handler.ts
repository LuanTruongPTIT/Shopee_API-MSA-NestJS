import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../command/create-category.command';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { CategoryService } from '../../infrastructure/services/category.service';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException, Inject } from '@nestjs/common';
import { ICategoryService } from '../../domain/interfaces/category.service.interface';
import { CategoryFactory } from '../../domain/factory/Category.factory';

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
    const { category_name, isParent, subscategories } = command;
    const exist = await this.categoryService.checkCategoryParentExist(
      category_name,
    );
    if (exist) {
      throw new RpcException(new BadRequestException('category.error.isExist'));
    }
    const category = this.categoryFactory.create(command);

    category.create();
    category.commit();
  }
}
