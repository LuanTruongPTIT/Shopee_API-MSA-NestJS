/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddCategoryProductCommand } from '../impl/add-category.command';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { InjectionToken } from '../../InjectionToken';
import { CategoryRepositoryImplements } from '../../../infrastructure/CategoryRepositoryImplements';
import { BadRequestException, Inject } from '@nestjs/common';
import { CategoryFactory } from '../../../domain/CategoryFactory';
import { RpcException } from '@nestjs/microservices';
@CommandHandler(AddCategoryProductCommand)
export class AddCategoryProductHandler
  implements ICommandHandler<AddCategoryProductCommand, IResponse>
{
  constructor(
    @Inject(InjectionToken.CATEGORY_REPOSITORY)
    private readonly categoryProductRepo: CategoryRepositoryImplements,

    private readonly categoryFactory: CategoryFactory,
  ) {}

  async execute(command: AddCategoryProductCommand): Promise<IResponse> {
    const { streamId, addCategoryProductDto } = command;

    const { _id, parents, ancestors } = addCategoryProductDto;
    const primary_category = await this.categoryProductRepo.findPrimaryCategory(
      _id,
    );
    console.log(primary_category);
    /**
     * Check category primary exist
     */
    if (primary_category) {
      throw new RpcException(
        new BadRequestException({
          message: 'category.primary.exist',
        }),
      );
    }

    if (parents) {
      const data_ancestors =
        await this.categoryProductRepo.findAncestorCategory(
          addCategoryProductDto.parents,
        );

      if (data_ancestors) {
        data_ancestors.forEach((data_ancestor) => {
          if (ancestors.includes(data_ancestor)) {
            throw new RpcException(
              new BadRequestException({
                message: 'category.children.conflict',
              }),
            );
          }
        });
      }
    } else {
      addCategoryProductDto.is_primary = true;
    }

    const category = this.categoryFactory.create(addCategoryProductDto);
    category.add(streamId, addCategoryProductDto);
    await this.categoryProductRepo.save(category);

    category.commit();
    return {
      data: {
        status: 200,
        message: 'Create category success',
      },
    };
  }
}
