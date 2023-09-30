import {
  IHelperDateOptionsCreate,
  IHelperDateOptionsForward,
} from './helper.interface';
export interface IHelperDateService {
  create(
    date?: string | number | Date,
    options?: IHelperDateOptionsCreate,
  ): Date;
  forwardInSeconds(seconds: number, options?: IHelperDateOptionsForward): Date;
}
