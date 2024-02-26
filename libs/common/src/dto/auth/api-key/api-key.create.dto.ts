import { ENUM_API_KEY_TYPE } from '@libs/common/api-key/constants/api-key.enum.constant';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiKeyUpdateDateDto } from './api-key.update-date.dto';

export class ApiKeyCreateDto extends PartialType(ApiKeyUpdateDateDto) {
  @ApiProperty({
    description: 'Api Key name',
    example: 'testapiname',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Api Key name',
    example: ENUM_API_KEY_TYPE.PUBLIC,
    required: true,
    enum: ENUM_API_KEY_TYPE,
  })
  @IsNotEmpty()
  @IsEnum(ENUM_API_KEY_TYPE)
  type: ENUM_API_KEY_TYPE;
}
