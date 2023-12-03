/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '@libs/common/pagination/interfaces/pagination.interface';
import { PopulateOptions } from 'mongoose';
export interface IDatabaseFindOneOptions<T = any>
  extends Pick<IPaginationOptions, 'order'> {
  select?: Record<string, boolean | number>;
  join?: boolean | PopulateOptions | PopulateOptions[];
  session?: T;
  withDeleted?: boolean;
  plainObject?: boolean;
}
export interface IDatabaseCreateOptions<T = any>
  extends Pick<IDatabaseFindOneOptions<T>, 'session'> {
  _id?: string;
}
export interface IDatabaseExistOptions<T = any>
  extends Pick<IDatabaseFindOneOptions<T>, 'session' | 'withDeleted' | 'join'> {
  excludeId?: string[];
  includeId: Array<string>;
}
export interface IDatabaseFindAllOptions<T = any>
  extends IPaginationOptions,
    Omit<IDatabaseFindOneOptions<T>, 'order'> {}

export type IDatabaseCreateManyOptions<T = any> = Pick<
  IDatabaseFindOneOptions<T>,
  'session'
>;
