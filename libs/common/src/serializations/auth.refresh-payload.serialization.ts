import { ResponseIdSerialization } from '../response/serializations/response.id.serialization';
import { AuthAccessPayloadSerialization } from './auth.access-payload.serialization';

import { OmitType } from '@nestjs/swagger';
export class AuthRefreshPayloadSerialization extends OmitType(
  AuthAccessPayloadSerialization,
  ['user'] as const,
) {
  user: ResponseIdSerialization;
}
