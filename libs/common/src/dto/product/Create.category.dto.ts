import { CategoryChildrenSerialization } from '@libs/common/serializations/product/category.children.serialization';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'Thoi trang nam',
  })
  @IsNotEmpty()
  @IsString()
  category_name: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isParent: boolean;

  subscategories: CategoryChildrenSerialization[];
}
