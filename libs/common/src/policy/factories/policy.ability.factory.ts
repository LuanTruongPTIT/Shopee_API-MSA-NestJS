import { HelperNumberService } from '@libs/common/helper/services/helper.number.service';
import {
  IPolicyAbility,
  IPolicyRequest,
  IPolicyRule,
  IPolicyRuleAbility,
} from '../interfaces/policy.interface';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { ENUM_ROLE_TYPE } from '@libs/common/constants/role.enum.constant';
import {
  ENUM_POLICY_ACTION,
  ENUM_POLICY_REQUEST_ACTION,
} from '../constants/policy.enum.constants';
import { Injectable } from '@nestjs/common';
import { UserPayloadPermissionSerialization } from '@libs/common/serializations/user.payload.serialization';

@Injectable()
export class PolicyAbilityFactory {
  constructor(private readonly helperNumberService: HelperNumberService) {}

  defineAbilityFromRole({ type, permissions }: IPolicyRequest) {
    const { can, build } = new AbilityBuilder<IPolicyAbility>(
      createMongoAbility,
    );

    if (type === ENUM_ROLE_TYPE.SUPER_ADMIN) {
      can(ENUM_POLICY_ACTION.MANAGE, 'all');
    } else {
      for (const permission of permissions) {
        const abilities = this.mappingAbility(permission);
        console.log('abilities', abilities);
        for (const ability of abilities) {
          can(ability.action, ability.subject);
        }
      }
    }
    return build();
  }

  mappingAbility({
    subject,
    action,
  }: UserPayloadPermissionSerialization): IPolicyRuleAbility[] {
    return action
      .split(',')
      .map((val: string) => ({
        action: this.mappingRequestRule(this.helperNumberService.create(val)),
        subject,
      }))
      .flat(1);
  }

  mappingRequestRule(action: number): ENUM_POLICY_ACTION {
    switch (action) {
      case ENUM_POLICY_REQUEST_ACTION.MANAGE:
        return ENUM_POLICY_ACTION.MANAGE;
      case ENUM_POLICY_REQUEST_ACTION.READ:
        return ENUM_POLICY_ACTION.READ;
      case ENUM_POLICY_REQUEST_ACTION.CREATE:
        return ENUM_POLICY_ACTION.CREATE;
      case ENUM_POLICY_REQUEST_ACTION.UPDATE:
        return ENUM_POLICY_ACTION.UPDATE;
      case ENUM_POLICY_REQUEST_ACTION.DELETE:
        return ENUM_POLICY_ACTION.DELETE;
      case ENUM_POLICY_REQUEST_ACTION.EXPORT:
        return ENUM_POLICY_ACTION.EXPORT;
      case ENUM_POLICY_REQUEST_ACTION.IMPORT:
        return ENUM_POLICY_ACTION.IMPORT;
      case ENUM_POLICY_REQUEST_ACTION.WRITE:
        return ENUM_POLICY_ACTION.WRITE;
      default:
        return null;
    }
  }

  handlerRules(rules: IPolicyRule[]) {
    return rules
      .map(({ subject, action }) => {
        return action
          .map((val) => (ability: IPolicyAbility) => ability.can(val, subject))
          .flat(1);
      })
      .flat(1);
  }
}
