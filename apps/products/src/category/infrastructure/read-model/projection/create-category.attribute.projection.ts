/* eslint-disable brace-style */
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AttributeCategoryEvent } from '../../../domain/event/create-attribute.event';
import { AttributeCategoryEntity } from '../schema/attribute-category.schema';
import { AttributeCategoryRepository } from '../../../domain/repository/attribute-category.repository';

@EventsHandler(AttributeCategoryEvent)
export class CreateAttributeCategoryProjection
  implements IEventHandler<AttributeCategoryEvent>
{
  constructor(
    private readonly attributeCategoryRepo: AttributeCategoryRepository,
  ) {}

  async handle(event: AttributeCategoryEvent) {
    console.log(event);
    const attributeCategoryEntity = new AttributeCategoryEntity();
    attributeCategoryEntity._id = event._id;
    attributeCategoryEntity.category_id = event.category_id;
    attributeCategoryEntity.attribute_value_list = event.attribute_list;
    await this.attributeCategoryRepo.create(attributeCategoryEntity);
  }
}
