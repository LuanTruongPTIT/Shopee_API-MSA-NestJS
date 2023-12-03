import { Type } from 'class-transformer';
import { AttributeValueDto } from './attribute-value.category.dto';
import { CategoryAttributeDto } from './attribute.category.dto';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class CreateAttributeCategoryDto {
  @ApiProperty({
    required: true,
    type: String,
    example: faker.string.uuid(),
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  category_id: string;

  @ApiProperty({
    required: true,
    type: CategoryAttributeDto,
    isArray: true,
  })
  @IsArray()
  @IsNotEmpty()
  @Type(() => CategoryAttributeDto)
  attribute_list: CategoryAttributeDto[];
}
