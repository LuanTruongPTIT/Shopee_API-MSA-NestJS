/* eslint-disable brace-style */
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AttributeCategoryEvent } from '../../../domain/event/create-attribute.event';
import { AttributeCategoryEntity } from '../schema/attribute-category.schema';
import { AttributeCategoryRepository } from '../../../domain/repository/attribute-category.repository';
import { AttributeCategroyValueRepository } from '../../../domain/repository/attribute-value-category.repository';
import { AttributeCategoryValueEntity } from '../schema/attribute-category-value.schema';

@EventsHandler(AttributeCategoryEvent)
export class CreateAttributeCategoryProjection
  implements IEventHandler<AttributeCategoryEvent>
{
  constructor(
    private readonly attributeCategoryRepo: AttributeCategoryRepository,
    private readonly attributeValueCategoryRepo: AttributeCategroyValueRepository,
  ) {}

  async handle(event: AttributeCategoryEvent) {
    console.log(event);
    const { _id, category_id, attribute_list } = event;
    const attributeCategoryEntity = new AttributeCategoryEntity();
    const attributeValueCategoryEntity = new AttributeCategoryValueEntity();
    attribute_list.forEach((item) =>
      console.log('item.attribute_value_list', item.attribute_value_list),
    );
    attributeCategoryEntity._id = event._id;

    // await this.attributeCategoryRepo.create(attributeCategoryEntity);
  }
}
