import { ApiProperty, OmitType } from '@nestjs/swagger';
import { AuthAccessPayloadSerialization } from './auth.access-payload.serialization';
import { ResponseIdSerialization } from '@libs/common/response/serializations/response.id.serialization';

export class AuthRefreshPayloadSerialization extends OmitType(
  AuthAccessPayloadSerialization,
  ['user'],
) {
  @ApiProperty({
    required: true,
    nullable: false,
    type: ResponseIdSerialization,
  })
  user: ResponseIdSerialization;
}
