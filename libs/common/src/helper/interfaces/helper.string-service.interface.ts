import { IHelperStringRandomOptions } from './helper.interface';

export interface IHelperStringService {
  random: (length: number, options?: IHelperStringRandomOptions) => string;
}
