/* eslint-disable brace-style */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAttributeCategoryCommand } from '../command/create-attribute.command';
import { BadRequestException, Inject } from '@nestjs/common';
import { IAttributeCategoryService } from '../../domain/interfaces/attribute-category.service.interface';
import { RpcException } from '@nestjs/microservices';
import { AttributeCategoryFactory } from '../../domain/factory/Attribute-category.factory';
@CommandHandler(CreateAttributeCategoryCommand)
export class CreateAttributeHandler
  implements ICommandHandler<CreateAttributeCategoryCommand>
{
  constructor(
    @Inject('ATTRIBUTE_CATEGORY_SERVICE')
    private readonly attributeCategoryService: IAttributeCategoryService,
    private readonly attributeCategoryFactory: AttributeCategoryFactory,
  ) {}

  async execute(command: CreateAttributeCategoryCommand): Promise<void> {
    const { _id, category_id, attribute_list } = command;

    const exist = await this.attributeCategoryService.checkCategoryAncestors(
      'category_parent_id',
      category_id,
    );

    if (exist) {
      throw new RpcException(
        new BadRequestException('category.ancestor.error.isNotExist'),
      );
    }
    const attribute_category = this.attributeCategoryFactory.create({
      _id,
      category_id,
      attribute_list,
    });

    attribute_category.create();
    attribute_category.commit();
  }
}
