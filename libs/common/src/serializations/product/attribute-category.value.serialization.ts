/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

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
    nullable: false,
    description: 'Value of attribute',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  value_unit: string;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @Type((T: any) => Array<typeof T>)
  @IsArray()
  options: Array<any>;
}
