import { IHelperNumberService } from '../interfaces/helper.number-service.interface';
// import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperNumberService implements IHelperNumberService {
  create(number: string): number {
    return Number(number);
  }
}
