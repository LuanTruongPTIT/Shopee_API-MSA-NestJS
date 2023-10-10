import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { AddAttributeCategoryRequestDto } from './AddAtributeCategory.request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class AddAttributeCategoryRequestDto_v2 {
  @ApiProperty({
    description: 'ID of category',
    example: 'Clothes of woman',
  })
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
export class AttributeListID {
  _id: Array<string>;
}
