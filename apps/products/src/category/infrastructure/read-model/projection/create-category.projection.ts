/* eslint-disable brace-style */
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AddCategoryEvent } from '../../../domain/event/create-category.event';
import { CategoryRepository } from '../../../domain/repository/Category.repository';
import { CategoryEntity } from '../schema/category.schema';

@EventsHandler(AddCategoryEvent)
export class CreateCategoryProjection
  implements IEventHandler<AddCategoryEvent>
{
  constructor(private readonly categoryRepo: CategoryRepository) {}
  async handle(event: AddCategoryEvent) {
    console.log(event);
    const categoryEntity = new CategoryEntity();
    categoryEntity._id = event._id;
    categoryEntity.category_name = event.category_name;
    categoryEntity.isParent = event.isParent;
    categoryEntity.image = event.file;
    categoryEntity.level = event.level;
    categoryEntity.isActive = event.isActive;
    categoryEntity.parent = event.parent;
    if (event.parent_id !== null) {
      categoryEntity.category_parent_id = [];
      event.parent_id.forEach((result) => {
        console.log(result);
        categoryEntity.category_parent_id.push(result);
      });
    } else {
      categoryEntity.category_parent_id = null;
    }

    await this.categoryRepo.create(categoryEntity);
  }
}
