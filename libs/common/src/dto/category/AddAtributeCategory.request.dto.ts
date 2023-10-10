import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { Attribute_InputValidation_Type } from '../../constants/Attribute.enum';
import { AddAttributeValueCategoryRequestDto } from './AddAttributeValueCategory.request.dto';
export class AddAttributeCategoryRequestDto {
  @ApiProperty({
    type: 'string',
    example: 'Size',
  })
  @MaxLength(12)
  @MinLength(6)
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  original_attribute_name: string;

  @ApiProperty({
    type: 'string',
    example: 'Product Size',
  })
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(6)
  @IsOptional()
  @IsString()
  display_attribute_name: string;

  @ApiProperty({
    type: 'array',
    example: 'STRING_TYPE',
  })
  @IsEnum(Attribute_InputValidation_Type)
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  input_validation_type: string;

  @ApiProperty({
    type: 'string',
    example: ['inches', 'cm'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString()
  value_unit: Array<string>;

  @ApiProperty({
    type: 'boolean',
    example: 'true',
  })
  @IsBoolean()
  is_mandatory: boolean;

  @ApiProperty({
    type: () => [AddAttributeValueCategoryRequestDto],
  })
  @IsArray()
  @IsNotEmpty()
  attribute_value_list: AddAttributeValueCategoryRequestDto[];
}
