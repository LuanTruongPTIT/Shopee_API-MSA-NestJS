/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { ConfigService } from '@nestjs/config';
export class MobileNumberAllowedConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly configService: ConfigService) {}

  async validate(value: string): Promise<boolean> {
    const mobileNumberSetting: string[] = this.configService.get<string[]>(
      'user.mobileNumberCountryCodeAllowed',
    );
    const check = mobileNumberSetting.find((val) => value.startsWith(val));
    return !!check;
  }
}

export function MobileNumberAllowed(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'MobileNumberCountryCodeAllowed',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: MobileNumberAllowedConstraint,
    });
  };
}
