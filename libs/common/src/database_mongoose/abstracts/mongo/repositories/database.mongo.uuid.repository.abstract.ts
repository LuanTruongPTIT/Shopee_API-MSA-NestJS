/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IDatabaseCreateOptions,
  IDatabaseFindOneOptions,
  IDatabaseExistOptions,
  IDatabaseFindAllOptions,
  IDatabaseCreateManyOptions,
} from '@libs/common/database_mongoose/interfaces/database.interface';
import { DatabaseBaseRepositoryAbstract } from '../../database.base-repository.abstract';
import { Model, PopulateOptions, ClientSession, FilterQuery } from 'mongoose';
import {
  DATABASE_DELETED_AT_FIELD_NAME,
  category_parent_id,
} from '@libs/common/database_mongoose/constants/database.constant';
export abstract class DatabaseMongoUUIDRepositoryAbstract<
  Entity,
  EntityDocument,
> extends DatabaseBaseRepositoryAbstract<EntityDocument> {
  protected _repository: Model<Entity>;
  protected _joinOnFind?: PopulateOptions | PopulateOptions[];
  constructor(
    repository: Model<Entity>,
    options?: PopulateOptions | PopulateOptions[],
  ) {
    super();
    this._repository = repository;
    this._joinOnFind = options;
  }

  async findOne<T = EntityDocument>(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions<ClientSession>,
  ): Promise<T> {
    const findOne = this._repository.findOne<EntityDocument>(find);

    if (options?.withDeleted) {
      findOne.or([
        {
          [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: false },
        },
        {
          [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: true },
        },
      ]);
    }
    if (options?.select) {
      findOne.select(options.select);
    }

    if (options?.join) {
      findOne.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }
    if (options?.session) {
      findOne.session(options.session);
    }
    return findOne.exec() as any;
  }

  async create<Dto = any>(
    data: Dto,
    options?: IDatabaseCreateOptions<ClientSession>,
  ): Promise<EntityDocument> {
    const dataCreate: Record<string, any> = data;
    if (options?._id) {
      dataCreate._id = options._id;
    }
    const created = await this._repository.create([dataCreate], {
      session: options ? options.session : undefined,
    });
    return created[0] as EntityDocument;
  }

  async exists(
    find?: Record<string, any>,
    options?: IDatabaseExistOptions<ClientSession>,
  ): Promise<boolean> {
    if (options?.excludeId) {
      find = {
        ...find,
        _id: {
          $in: options?.excludeId ?? [],
        },
      };
    }

    const exists = this._repository.exists(find);

    if (options?.withDeleted) {
      exists.or([
        {
          [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: false },
        },
        {
          [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: true },
        },
      ]);
    } else {
      exists.where(DATABASE_DELETED_AT_FIELD_NAME).exists(false);
    }

    if (options?.join) {
      exists.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }
    if (options?.session) {
      exists.session(options.session);
    }
    const result = await exists;
    return !!result;
  }

  async findAllByField<T = EntityDocument>(
    field: string,
    options?: IDatabaseExistOptions<ClientSession>,
  ): Promise<Array<any>> {
    const filter: FilterQuery<any> = {
      [field]: { $in: options?.includeId ?? [] },
    };
    const exists = await this._repository.find(filter);

    return exists;
  }

  async findOneById<T = EntityDocument>(
    _id: string,
    options?: IDatabaseFindOneOptions<ClientSession>,
  ): Promise<T> {
    const findOne = this._repository.findById<EntityDocument>(_id);
    if (options?.withDeleted) {
      findOne.or([
        {
          [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: false },
        },
        {
          [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: true },
        },
      ]);
    } else {
      findOne.where(DATABASE_DELETED_AT_FIELD_NAME).exists(false);
    }

    if (options?.select) {
      findOne.select(options.select);
    }
    if (options?.join) {
      findOne.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }
    if (options?.session) {
      findOne.session(options.session);
    }

    // if (options?.order) {
    //   findOne.sort(options.order);
    // }

    return findOne.exec() as any;
  }

  async findAll<T = EntityDocument>(
    find?: Record<string, any>,
    options?: IDatabaseFindAllOptions<ClientSession>,
  ): Promise<T[]> {
    const findAll = this._repository.find<T>(find);

    if (options?.withDeleted) {
      findAll.or([
        {
          [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: false },
        },
        {
          [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: true },
        },
      ]);
    } else {
      findAll.where(DATABASE_DELETED_AT_FIELD_NAME).exists(false);
    }

    if (options?.select) {
      findAll.select(options.select);
    }

    if (options?.paging) {
      findAll.limit(options.paging.limit).skip(options.paging.offset);
    }

    if (options?.order) {
      findAll.sort(options.order);
    }

    if (options?.join) {
      findAll.populate(
        typeof options.join === 'boolean'
          ? this._joinOnFind
          : (options.join as PopulateOptions | PopulateOptions[]),
      );
    }

    if (options?.session) {
      findAll.session(options.session);
    }

    return options?.plainObject ? findAll.lean() : findAll.exec();
  }

  async createMany<Dto>(
    data: Dto[],
    options?: IDatabaseCreateManyOptions<any>,
  ): Promise<EntityDocument[]> {
    const create = (await this._repository.insertMany(
      data,
    )) as EntityDocument[];
    return create;
  }

  async findByIdAndUpdate<T = EntityDocument>(
    _id: string,
    data: Record<string, any>,
  ): Promise<boolean> {
    await this._repository.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: data,
      },
    );
    return true;
  }
}
