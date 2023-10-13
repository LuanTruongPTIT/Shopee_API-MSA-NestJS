import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
// import {} from ''
import { faker } from '@faker-js/faker';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  MinLength,
  MaxLength,
  ArrayNotEmpty,
  IsArray,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
// import {} from '';
import {
  ENUM_POLICY_ACTION,
  ENUM_POLICY_SUBJECT,
  ENUM_ROLE_TYPE,
} from '@libs/common/constants/role.enum.constant';
// import {} from '';
class RolePermissionDto {
  @ApiProperty({
    required: true,
    description: 'Permission subject',
    enum: ENUM_POLICY_SUBJECT,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(ENUM_POLICY_SUBJECT)
  subject: ENUM_POLICY_SUBJECT;

  @ApiProperty({
    required: true,
    description: 'Permission action base on subject',
    isArray: true,
    default: [],
    enum: ENUM_POLICY_ACTION,
  })
  @IsString({ each: true })
  @IsEnum(ENUM_POLICY_ACTION, { each: true })
  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  action: ENUM_POLICY_ACTION[];
}
export class RoleCreateDto {
  @ApiProperty({
    description: 'Name of role',
    example: faker.person.jobTitle(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @Type(() => String)
  readonly name: string;

  @ApiProperty({
    description: 'Representative for role type',
    example: 'ADMIN',
    required: true,
  })
  @IsEnum(ENUM_ROLE_TYPE)
  @IsNotEmpty()
  readonly type: ENUM_ROLE_TYPE;

  @ApiProperty({
    required: true,
    description: 'Permission list of role',
    isArray: true,
    default: [],
    example: [
      {
        subject: ENUM_POLICY_SUBJECT.API_KEY,
        action: [ENUM_POLICY_ACTION.DELETE],
      },
    ],
  })
  @Type(() => RolePermissionDto)
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @ValidateIf((e) => e.type === ENUM_ROLE_TYPE.ADMIN)
  @Transform(({ value, obj }) =>
    obj.type !== ENUM_ROLE_TYPE.ADMIN ? [] : value,
  )
  permission: RolePermissionDto[];
}
