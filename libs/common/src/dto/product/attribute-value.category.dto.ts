import { AttributeCategoryValueSerialization } from '@libs/common/serializations/product/attribute-category.value.serialization';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class AttributeValueDto {
  @ApiProperty({
    description: 'Chain categoryID',
    example: ['43223432', '3423424234234'],
  })
  @IsArray()
  category_id: Array<string>;

  @ApiProperty({
    description: 'Attribute value list ',
    type: AttributeCategoryValueSerialization,
  })
  @Type(() => AttributeCategoryValueSerialization)
  attribute_list: AttributeCategoryValueSerialization[];
}
