import { faker } from '@faker-js/faker';
import {
  ENUM_SHIPPING_ID,
  NAME_SHIPPING_METHOD,
} from '@libs/common/constants/logistics.enum';
import { ItemMaxDimension } from '@libs/common/serializations/logistics/item-max-dimension.serialization';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateShippingMethodDto {
  @ApiProperty({
    required: true,
    enum: NAME_SHIPPING_METHOD,
  })
  @IsEnum(NAME_SHIPPING_METHOD)
  @IsNotEmpty()
  name: NAME_SHIPPING_METHOD;

  @ApiProperty({
    required: true,
    nullable: false,
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  is_shipping_method_enabled: boolean;

  @ApiProperty({
    required: true,
    nullable: false,
    example: 200,
    type: Number,
  })
  @Max(200)
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  item_max_weight: number;

  @ApiProperty({
    required: true,
    nullable: false,
    example: 0,
    type: Number,
  })
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  item_min_weight: number;

  @ApiProperty({
    example: {
      height: 20,
      length: 30,
      width: 100,
    },
    required: true,
  })
  @IsNotEmpty()
  item_max_dimension: ItemMaxDimension;

  @ApiProperty({
    default: false,
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  is_free_shipping_shop_channel: boolean;

  @ApiProperty({
    required: false,
    nullable: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  is_displayed: boolean;

  @ApiProperty({
    required: false,
    nullable: true,
    default: '',
  })
  // @MinLength(30)
  // @MaxLength(140)
  @IsString()
  @IsOptional()
  block_reason: string;

  @ApiProperty({
    required: false,
    nullable: true,
    example: faker.string.uuid(),
    default: '',
  })
  @IsString()
  @IsOptional()
  parent_id: string;

  @ApiProperty({
    required: false,
    nullable: true,
    default: '',
  })
  parent_id_list: string[];
}
