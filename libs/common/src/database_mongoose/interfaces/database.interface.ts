/* eslint-disable @typescript-eslint/no-explicit-any */
import { PopulateOptions } from 'mongoose';
export interface IDatabaseFindOneOptions<T = any> {
  select?: Record<string, boolean | number>;
  join?: boolean | PopulateOptions | PopulateOptions[];
  session?: T;
  withDeleted?: boolean;
}
export interface IDatabaseCreateOptions<T = any>
  extends Pick<IDatabaseFindOneOptions<T>, 'session'> {
  _id?: string;
}
export interface IDatabaseExistOptions<T = any>
  extends Pick<IDatabaseFindOneOptions<T>, 'session' | 'withDeleted' | 'join'> {
  excludeId?: string[];
}
