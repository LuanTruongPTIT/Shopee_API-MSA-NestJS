import { faker } from '@faker-js/faker';
import { IHelperStringRandomOptions } from '../interfaces/helper.interface';
import { IHelperStringService } from '../interfaces/helper.string-service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperStringService implements IHelperStringService {
  random(length: number, options?: IHelperStringRandomOptions): string {
    const rString = options?.safe
      ? faker.internet.password({
          length,
          memorable: true,
          pattern: /[A-Z]/,
          prefix: options?.prefix,
        })
      : faker.internet.password({
          length,
          memorable: false,
          pattern: /\w/,
          prefix: options?.prefix,
        });
    return options?.upperCase ? rString.toUpperCase() : rString;
  }
}
