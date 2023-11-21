import { ENUM_POLICY_SUBJECT } from '@libs/common/policy/constants/policy.enum.constants';
import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { UserProfileSerialization } from './user.profile.serialization';
import { Exclude, Expose, Transform } from 'class-transformer';
import { faker } from '@faker-js/faker';
import {
  ENUM_POLICY_REQUEST_ACTION,
  ENUM_ROLE_TYPE,
} from '@libs/common/constants/role.enum.constant';
import { IPolicyRule } from '@libs/common/interfaces/policy.interface';
import { ENUM_USER_SIGN_UP_FROM } from '@libs/common/constants/user.enum';
// import {} from '';
export class UserPayloadPermissionSerialization {
  @ApiProperty({
    required: true,
    nullable: false,
    enum: ENUM_POLICY_SUBJECT,
    example: ENUM_POLICY_SUBJECT.API_KEY,
  })
  subject: ENUM_POLICY_SUBJECT;

  @ApiProperty({
    required: true,
    nullable: false,
  })
  action: string;
}

export class UserPayloadSerialization extends OmitType(
  UserProfileSerialization,
  ['photo', 'role', 'signUpDate', 'createdDate', 'updatedDate'] as const,
) {
  @ApiHideProperty()
  @Exclude()
  readonly photo?: string;

  @ApiProperty({
    example: [faker.string.uuid()],
    type: 'string',
    isArray: true,
    required: true,
    nullable: false,
  })
  @Transform(({ obj }) => `${obj.role._id}`)
  readonly role: string;

  @ApiProperty({
    example: ENUM_ROLE_TYPE.ADMIN,
    type: 'string',
    enum: ENUM_ROLE_TYPE,
    required: true,
    nullable: false,
  })
  @Expose()
  @Transform(({ obj }) => obj.role.type)
  readonly type: ENUM_ROLE_TYPE;

  @ApiProperty({
    type: () => UserPayloadPermissionSerialization,
    isArray: true,
    required: true,
    nullable: false,
  })
  @Transform(({ obj }) => {
    return obj.role.permissions.map(({ action, subject }: IPolicyRule) => {
      const ac = action.map((l) => ENUM_POLICY_REQUEST_ACTION[l.toUpperCase()]);
      return {
        subject,
        action: ac.join(','),
      };
    });
  })
  @Expose()
  readonly permissions: UserPayloadPermissionSerialization[];

  @ApiHideProperty()
  @Exclude()
  readonly signUpDate: Date;

  @ApiHideProperty()
  @Exclude()
  readonly signUpFrom: ENUM_USER_SIGN_UP_FROM;

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.date.recent(),
  })
  // @Expose()
  @Exclude()
  readonly loginDate: Date;

  @ApiHideProperty()
  @Exclude()
  readonly createdDate: number;

  @ApiHideProperty()
  @Exclude()
  readonly updatedDate: number;
}
