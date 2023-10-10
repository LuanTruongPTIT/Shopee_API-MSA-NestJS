import { ENUM_POLICY_SUBJECT } from '../../common/policy/constants/policy.enum.constants';
import { ApiProperty } from '@nestjs/swagger';
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
