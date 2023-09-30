import moment from 'moment';
import { IHelperDateService } from '../interfaces/helper.date-service.interface';
import {
  IHelperDateOptionsCreate,
  IHelperDateOptionsForward,
} from '../interfaces/helper.interface';
import { Injectable } from '@nestjs/common';
@Injectable()
export class HelperDateService implements IHelperDateService {
  create(
    date?: string | number | Date,
    options?: IHelperDateOptionsCreate,
  ): Date {
    const mDate = moment(date ?? undefined);
    if (options?.startOfDay) {
      mDate.startOf('day');
    }
    return mDate.toDate();
  }

  forwardInSeconds(seconds: number, options?: IHelperDateOptionsForward): Date {
    return moment(options?.fromDate).add(seconds, 's').toDate();
  }
}
