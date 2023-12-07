import { CreateAttributeCategoryDto } from '@libs/common/dto/product/create-attribute.category.dto';
import { AttributeCategoryValueSerialization } from '@libs/common/serializations/product/attribute-category.value.serialization';
import { ICommand } from '@nestjs/cqrs';

export class CreateAttributeCategoryCommand implements ICommand {
  constructor(
    public readonly _id: string,
    public readonly attributeCategory: CreateAttributeCategoryDto,
  ) {}
}
