import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AddAttributeCategoryRequestDto } from './AddAtributeCategory.request.dto';
import { ApiProperty } from '@nestjs/swagger';
export class AddAttributeCategoryRequestDto_v2 {
  @ApiProperty({
    description: 'ID of category',
    example: 'Clothes of woman',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category_id: string;

  @ApiProperty({
    type: () => [AddAttributeCategoryRequestDto],
  })
  @IsNotEmpty()
  @IsArray()
  attributes: AddAttributeCategoryRequestDto[];
}
