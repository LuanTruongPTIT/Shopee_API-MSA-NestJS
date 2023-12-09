import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AttributeProductPayloadSerialization } from './attribute-product.payload.serialization';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProductInfoPayloadSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    type: String,
    minLength: 10,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(10)
  @Type(() => String)
  name: string;

  @ApiProperty({
    required: true,
    nullable: false,
    type: AttributeProductPayloadSerialization,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  attributes: AttributeProductPayloadSerialization[];
}
