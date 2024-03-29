import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class GreaterThanEqualConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, args: ValidationArguments): boolean {
    console.log('args', args);
    const [property] = args.constraints;
    const relatedValue = args.object[property];
    return value >= relatedValue;
  }
}
export function GreaterThanEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  console.log('property', property);
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'GreaterThanEqual',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: GreaterThanEqualConstraint,
    });
  };
}
