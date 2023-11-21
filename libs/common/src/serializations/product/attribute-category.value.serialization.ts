/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AttributeCategoryValueSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Value of attribute',
  })
  @Type(() => String)
  value_unit: string;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @Type((T: any) => Array<typeof T>)
  options: Array<any>;
}
