import moment from 'moment';
import { IHelperDateService } from '../interfaces/helper.date-service.interface';
import {
  IHelperDateOptionsCreate,
  IHelperDateOptionsFormat,
  IHelperDateOptionsForward,
} from '../interfaces/helper.interface';
import { Injectable } from '@nestjs/common';
import { ENUM_HELPER_DATE_FORMAT } from '../constants/helper.enum.constant';
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

  timestamp(date?: string | number | Date, options?: IHelperDateOptionsCreate) {
    const mDate = moment(date ?? undefined);
    if (options?.startOfDay) {
      mDate.startOf('day');
    }
    return mDate.valueOf();
  }

  format(date?: Date, options?: IHelperDateOptionsFormat): string {
    return moment(date).format(options?.format ?? ENUM_HELPER_DATE_FORMAT.DATE);
  }

  startOfDay(date?: Date): Date {
    return moment(date).startOf('day').toDate();
  }

  hello() {
    console.log('Da vao day');
  }
}
