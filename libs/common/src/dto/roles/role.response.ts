import { ENUM_ROLE_TYPE } from '@libs/common/constants/role.enum.constant';
import { IPolicyRule } from '@libs/common/interfaces/policy.interface';

export class RoleResponse {
  readonly _id: string;
  readonly description: string;
  readonly isActive: boolean;
  readonly type: ENUM_ROLE_TYPE;
  readonly perrmissions: IPolicyRule[];
}
