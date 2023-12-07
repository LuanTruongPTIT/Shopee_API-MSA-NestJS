/* eslint-disable brace-style */
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AttributeCategoryEvent } from '../../../domain/event/create-attribute.event';
import { AttributeCategoryEntity } from '../schema/attribute-category.schema';
import { AttributeCategoryRepository } from '../../../domain/repository/attribute-category.repository';
import { AttributeCategroyValueRepository } from '../../../domain/repository/attribute-value-category.repository';
import { AttributeCategoryValueEntity } from '../schema/attribute-category-value.schema';
import { HelperArrayService } from '@libs/common/helper/services/helper.array.service';
import { HelperIdManagementService } from '@libs/common/helper/services/helper.id.management.service';
import { CategoryRepository } from '../../../domain/repository/Category.repository';
import { CategoryEntity } from '../schema/category.schema';

@EventsHandler(AttributeCategoryEvent)
export class CreateAttributeCategoryProjection
  implements IEventHandler<AttributeCategoryEvent>
{
  constructor(
    private readonly attributeCategoryRepo: AttributeCategoryRepository,
    private readonly attributeValueCategoryRepo: AttributeCategroyValueRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly helperArrayService: HelperArrayService,
    private readonly helperId: HelperIdManagementService,
  ) {}

  async handle(event: AttributeCategoryEvent) {
    const { _id, category_id, attribute_list } = event;

    const attribute_category_id = await Promise.all(
      attribute_list.map(async (item) => {
        const result = await this.attributeValueCategoryRepo.createMany(
          item.attribute_value_list,
        );
        const idAttributeValue = this.helperArrayService.map(result, '_id');

        const attributeCategoryEntity = new AttributeCategoryEntity();
        attributeCategoryEntity.attribute_value_id = idAttributeValue;
        attributeCategoryEntity.attribute_name = item.attribute_name;
        attributeCategoryEntity.display_name = item.display_name;
        attributeCategoryEntity.mandatory = item.mandatory;
        attributeCategoryEntity._id = this.helperId.generateId();

        const dataAttriCategory = await this.attributeCategoryRepo.create(
          attributeCategoryEntity,
        );
        console.log('dataAttriCategory', dataAttriCategory._id);

        return dataAttriCategory._id;
      }),
    );

    console.log('attribute_category_id', attribute_category_id);

    const data = {
      attribute_category_id,
    };

    await this.categoryRepo.findByIdAndUpdate(category_id, data);
  }
}
