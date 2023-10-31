/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IDatabaseFindOneOptions,
  IDatabaseCreateOptions,
  IDatabaseExistOptions,
} from '../interfaces/database.interface';

import { ClientSession } from 'mongoose';
export abstract class DatabaseBaseRepositoryAbstract<Entity> {
  abstract findOne<T = Entity>(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions<any>,
  ): Promise<T>;

  abstract create<Dto = any>(
    data: Dto,
    options: IDatabaseCreateOptions<ClientSession>,
  ): Promise<Entity>;

  abstract exists(
    find: Record<string, any>,
    options?: IDatabaseExistOptions<any>,
  ): Promise<boolean>;

  abstract findOneById<T = Entity>(
    _id: string,
    options?: IDatabaseFindOneOptions,
  ): Promise<T>;
}
