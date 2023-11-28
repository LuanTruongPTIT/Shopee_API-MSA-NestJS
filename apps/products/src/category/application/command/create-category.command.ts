import { CATEGORY_PRODUCT_LEVEL } from '@libs/common/constants/category.enum';
import { ICommand } from '@nestjs/cqrs';
export class CreateCategoryCommand implements ICommand {
  constructor(
    public readonly _id: string,
    public readonly category_name: string,

    public readonly file: string,
    public readonly level: CATEGORY_PRODUCT_LEVEL,
    public readonly category_parent_id: string,
  ) {}
}
