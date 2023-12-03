import { Injectable } from '@nestjs/common';
import { IHelperArrayService } from '../interfaces/helper.array-service.interface';
import _ from 'lodash';

@Injectable()
export class HelperArrayService implements IHelperArrayService {
  includes<T>(a: T[], b: T): boolean {
    return _.includes(a, b);
  }
}
