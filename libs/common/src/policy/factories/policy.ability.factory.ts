// import { Injectable } from '@nestjs/common';
// import { HelperNumberService } from '../../helper/services/helper.number.service';
// import { AbilityBuilder, createMongoAbility } from '@casl/ability';
// import { IPolicyRequest, IPolicyAbility } from '../interfaces/policy.interface';
// import { ENUM_ROLE_TYPE } from '@libs/common/constants/role.enum.constants';
// import { ENUM_POLICY_ACTION } from '../constants/policy.enum.constants';
// @Injectable()
// export class PolicyAbilityFactory {
//   constructor(private readonly helperNumberService: HelperNumberService) {}
//   defineAbilityFromRole({ type, permissions }: IPolicyRequest) {
//     const { can, build } = new AbilityBuilder<IPolicyAbility>(
//       createMongoAbility,
//     );
//     if (type === ENUM_ROLE_TYPE.SUPER_ADMIN) {
//       can(ENUM_POLICY_ACTION.MANAGE, 'all');
//     } else {
//       for (const permission of permissions) {
//         const abilities = this.mappingAbility(permission);
//       }
//     }
//   }

//   mappingAbility() {}
// }
