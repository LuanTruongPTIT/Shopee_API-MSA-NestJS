import { AuthRefreshPayloadSerialization } from '@libs/common/serializations/auth/auth.refresh-payload.serialization';
import { UserGetSerialization } from '@libs/common/serializations/user.get.serialization';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRefreshTokenDto {
  @ApiProperty({
    required: true,
    nullable: false,
    description: 'RefreshToken is authen user',
    type: String,
  })
  refreshToken: string;

  @ApiProperty({
    required: true,
    nullable: false,
    type: AuthRefreshPayloadSerialization,
  })
  refreshPayload: AuthRefreshPayloadSerialization;

  @ApiProperty({
    required: true,
    nullable: false,
    type: UserGetSerialization,
  })
  user: Record<string, any>;
}
