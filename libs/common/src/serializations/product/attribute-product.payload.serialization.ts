import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
export class AttributeProductPayloadSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  attribute_id: string;

  // attri
}
