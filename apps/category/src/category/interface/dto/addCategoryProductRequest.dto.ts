import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';
// import { Attribute } from '../../infrastructure/entity/attribute.entity';
// import { Product } from '../../infrastructure/entity/product.entity';

export class AddCategoryProductRequestDTO {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Clothes',
  })
  _id: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: 'array',
    example: ['short__Clothes'],
  })
  ancestors: Array<string>;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ type: 'array', example: 'short_shopee' })
  parents: string;

  @IsNotEmpty()
  // @MaxLength(14)
  // @MinLength(8)
  @ApiProperty({
    // minLength: 8,
    // maxLength: 14,
    example: 'Clothes_Boy_Girl',
  })
  name: string;

  @IsBoolean()
  @ApiProperty({
    example: 'true',
  })
  is_primary: boolean;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Clothes is beautiful',
  })
  description: string;

  @IsArray()
  @ApiProperty({
    type: 'array',
    example: ['https://cf.shopee.sg/file/8424390be4677b0b3c37ce6499ce261a'],
  })
  image: Array<string>;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: 'boolean',
  })
  no_license_Seller_enabled: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: 'boolean',
  })
  is_product_listing_enabled: boolean;

  // @IsArray()
  // @IsOptional()
  // @ApiProperty({
  //   type: 'array',
  // })
  // attribute_id: Attribute[];

  // @IsArray()
  // @IsOptional()
  // @ApiProperty({
  //   type: 'array',
  // })
  // product_id: Product[];
}
