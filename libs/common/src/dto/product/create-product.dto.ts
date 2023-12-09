import { ProductInfoPayloadSerialization } from '@libs/common/serializations/product/product-info.payload.serialization';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    type: Boolean,
    required: true,
    nullable: false,
  })
  @Type(() => Boolean)
  is_draft: boolean;

  @ApiProperty({
    type: ProductInfoPayloadSerialization,
    required: true,
    nullable: false,
  })
  product_info: ProductInfoPayloadSerialization;
}
