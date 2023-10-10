import { ApiProperty, OmitType } from '@nestjs/swagger';
import { AddAttributeCategoryRequestDto } from './AddAtributeCategory.request.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class AddAttributeValueCategoryRequestDto {
  _id: string;
  @ApiProperty({
    type: 'string',
    example: 'Medium',
  })
  @MaxLength(12)
  @MinLength(2)
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  original_attribute_name: string;

  @ApiProperty({
    type: 'string',
    example: 'M',
  })
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(2)
  @IsOptional()
  @IsString()
  display_attribute_name: string;

  @ApiProperty({
    example: 'cm',
  })
  @IsString()
  value_unit: string;
}
