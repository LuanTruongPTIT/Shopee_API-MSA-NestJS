import { faker } from '@faker-js/faker';
import { PickUpAddressSerilization } from '@libs/common/serializations/seller_channel/pickup-address.serialization';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateSellerChannelDto {
  @ApiProperty({
    required: true,
    nullable: false,
    maxLength: 100,
    minLength: 20,
    type: String,
    example: 'Shop quan ao Tang Nhon phu A',
  })
  // @Min(20)
  // @Max(100)
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  shop_name: string;

  @ApiProperty({
    required: true,
    nullable: false,
    type: PickUpAddressSerilization,
  })
  @IsNotEmpty()
  @IsObject()
  @Type(() => PickUpAddressSerilization)
  pick_up_address: PickUpAddressSerilization;

  @ApiProperty({
    required: true,
    nullable: false,
    isArray: true,
    example: [5001, 5002],
  })
  @IsNotEmpty()
  @IsArray()
  @Type(() => Array<string>)
  shipping_method_id: string[];

  @ApiProperty({
    required: true,
    nullable: false,
    type: String,
    example: faker.string.uuid(),
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  user_id: string;
}
