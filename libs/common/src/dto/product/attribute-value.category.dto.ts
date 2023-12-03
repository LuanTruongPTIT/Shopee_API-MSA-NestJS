import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AttributeValueDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  value_name: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @Type(() => String)
  display_name: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  value_unit: string;
}
