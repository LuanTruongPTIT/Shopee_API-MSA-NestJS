import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { POLICY_RULE_META_KEY } from '../constants/policy.constants';
import { PolicyGuard } from '../guards/policy.ability.guard';
import { IPolicyRule } from '../interfaces/policy.interface';

export function PolicyAbilityProtected(
  ...handlers: IPolicyRule[]
): MethodDecorator {
  return applyDecorators(
    UseGuards(PolicyGuard),
    SetMetadata(POLICY_RULE_META_KEY, handlers),
  );
}
