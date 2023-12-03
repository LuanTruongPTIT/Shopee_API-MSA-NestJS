/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class AttributeCategoryValueSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    type: String,
  })
  @IsString()
  value_name: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  display_name: string;

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Value of attribute',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  value_unit: string;
}
