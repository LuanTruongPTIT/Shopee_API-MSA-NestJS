import { CreateCategoryDto } from '@libs/common/dto/product/Create.category.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateCategorySerilization extends OmitType(CreateCategoryDto, [
  'file',
  'category_parent_id',
]) {
  file: string;
  category_parent_id: string;
}
