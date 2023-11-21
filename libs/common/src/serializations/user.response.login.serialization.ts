import { ENUM_ROLE_TYPE } from '../constants/role.enum.constant';

export class UserResponseLoginSerialization {
  accessToken: string;
  refreshToken: string;
  expirationIn: number;
  tokenType: string;
  type: ENUM_ROLE_TYPE;
}
