import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { AttributeValueDto } from './attribute-value.category.dto';

export class CategoryAttributeDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  attribute_name: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  display_name: string;

  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  mandatory: boolean;

  @ApiProperty({
    description: 'Attribute value list ',
    type: AttributeValueDto,
    isArray: true,
  })
  @Type(() => AttributeValueDto)
  attribute_value_list: AttributeValueDto[];
}
