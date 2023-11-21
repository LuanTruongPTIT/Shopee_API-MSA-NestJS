import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AttributeCategoryValueSerialization } from './attribute-category.value.serialization';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryChildrenSerialization {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'Ao nam',
  })
  @IsNotEmpty()
  @IsString()
  category_name_children: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsUUID()
  parent_category_id: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  original_category_name: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  isChildren: boolean;

  attribute_value?: AttributeCategoryValueSerialization[];

  subscategories?: CategoryChildrenSerialization;
}
