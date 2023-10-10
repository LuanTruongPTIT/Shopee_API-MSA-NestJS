/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable brace-style */
import { AddAttributeCategoryCommand } from '../impl/add-attribute.category.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../../InjectionToken';
import { ForbiddenException, Inject } from '@nestjs/common';
import { AttributeCategoryRepositoryimpelents } from '../../../infrastructure/AttributeCategoryRepositoryImplements';
import { DbTransactionFactory } from '@libs/common/transactional/DBTransactionFactory';
import { CategoryRepositoryImplements } from '../../../infrastructure/CategoryRepositoryImplements';
import { RpcException } from '@nestjs/microservices';
import { AddAttributeValueCategoryRequestDto } from '../../../interface/dto/AddAttributeValueCategory.request.dto';

@CommandHandler(AddAttributeCategoryCommand)
export class AddAttributeCategoryHandler
  implements ICommandHandler<AddAttributeCategoryCommand>
{
  constructor(
    @Inject(InjectionToken.ATTRIBUTE_CATEGORY_REPOSITORY)
    private readonly attributeCategory: AttributeCategoryRepositoryimpelents,
    @Inject(InjectionToken.CATEGORY_REPOSITORY)
    private readonly categoryProductRepo: CategoryRepositoryImplements,
    private readonly transactionalRunner: DbTransactionFactory,
  ) {}

  async execute(command: AddAttributeCategoryCommand) {
    let transactionRunner = null;
    try {
      transactionRunner = await this.transactionalRunner.createTransaction();
      await transactionRunner.startTransaction();
      // const transactionManger = transactionRunner.TransactionalManager;

      const { streamId, addAttributeCategoryRequestDto_v2 } = command;
      const { category_id } = addAttributeCategoryRequestDto_v2;
      /**
       * Find category is exist
       */
      const IsCategory = await this.categoryProductRepo.findPrimaryCategory(
        category_id,
      );
      if (!IsCategory) {
        throw new RpcException(
          new ForbiddenException('category.error.notexist'),
        );
      }
      /**
       * Push attribute_value-item into array
       */
      const attribute_value_item: AddAttributeValueCategoryRequestDto[] = [];
      addAttributeCategoryRequestDto_v2.attributes.forEach((item) => {
        if (item.attribute_value_list) {
          attribute_value_item.push(...item.attribute_value_list);
        }
      });
      await this.attributeCategory.saveAttributeValue(attribute_value_item);
      await this.attributeCategory.saveAttribute(
        addAttributeCategoryRequestDto_v2,
      );
      /**
       * Push id of attribute in array
       */
      const attribute_id: Array<string> = [];
      addAttributeCategoryRequestDto_v2.attributes.forEach((item) => {
        if (item._id) {
          attribute_id.push(item._id);
        }
      });

      await this.categoryProductRepo.updateAttributeOfCategory(
        category_id,
        attribute_id,
      );
      await transactionRunner.commitTransaction();
      return {
        data: {
          status: 200,
          message: 'Create attribute category success',
        },
      };
    } catch (error) {
      if (transactionRunner) await transactionRunner.rollbackTransaction();
    } finally {
      if (transactionRunner) await transactionRunner.releaseTransaction();
    }
  }
}
