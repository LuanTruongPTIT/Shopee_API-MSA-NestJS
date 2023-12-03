import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { POLICY_RULE_META_KEY } from '../constants/policy.constants';
import { IRequestApp } from '@libs/common/request/interfaces/request.interface';
import { PolicyAbilityFactory } from '../factories/policy.ability.factory';
import {
  IPolicyAbility,
  IPolicyRule,
  PolicyHandler,
} from '../interfaces/policy.interface';
import { ENUM_POLICY_STATUS_CODE_ERROR } from '../constants/policy.status-code.constant';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly policyAbilityFactory: PolicyAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyRule =
      this.reflector.get<IPolicyRule[]>(
        POLICY_RULE_META_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest<IRequestApp>();

    const { type, permissions } = user.user;

    const ability = this.policyAbilityFactory.defineAbilityFromRole({
      type,
      permissions,
    });
    console.log(ability);
    const policyHandler = this.policyAbilityFactory.handlerRules(policyRule);
    const check: boolean = policyHandler.every((handler: PolicyHandler) => {
      return this.execPolicyHandler(handler, ability);
      // console.log(handler.toString());
    });
    // console.log('ability', ability);
    console.log(check);
    if (!check) {
      throw new ForbiddenException({
        statusCode:
          ENUM_POLICY_STATUS_CODE_ERROR.POLICY_ABILITY_FORBIDDEN_ERROR,
        message: 'policy.error.abilityForbidden',
      });
    }
    return true;
  }

  private execPolicyHandler(handler: PolicyHandler, ability: IPolicyAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    } else {
      return handler.handle(ability);
    }
  }
}
