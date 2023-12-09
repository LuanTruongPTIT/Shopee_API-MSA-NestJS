import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class PickUpAddressSerilization {
  @ApiProperty({
    required: true,
    nullable: false,
    type: String,
    example: 'Truong',
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  firstName: string;

  @ApiProperty({
    required: true,
    nullable: false,
    type: String,
    example: 'Luan',
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  lastName: string;

  @ApiProperty({
    nullable: true,
    required: false,
    example: faker.phone.number(),
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  mobilephone: string;

  @ApiProperty({
    required: true,
    nullable: false,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  address: string;
}
