/* eslint-disable @typescript-eslint/no-explicit-any */
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import moment from 'moment';

@ValidatorConstraint({ async: true })
@Injectable()
export class DateGreaterThanEqualToDayConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly helperDateService: HelperDateService) {}
  validate(value: string): boolean {
    // const todayDate = this.helperDateService.startOfDay();
    const todayDate = moment().startOf('day').toDate();
    const valueDateBeforeSeri = moment(value).startOf('day').toDate();
    const valueDate = moment(valueDateBeforeSeri).startOf('day').toDate();
    console.log(todayDate, valueDateBeforeSeri, valueDate);
    return valueDate >= todayDate;
  }
}
export function DateGreaterThanEqualToday(
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'DateGreaterThanEqualToday',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: DateGreaterThanEqualToDayConstraint,
    });
  };
}
