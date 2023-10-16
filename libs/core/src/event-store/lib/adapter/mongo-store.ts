import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAdapterStore } from './adapter.interface';
import { ProjectionDto } from './projection.dto';
import {} from 'typeorm';

@Injectable()
export class MongoStore implements IAdapterStore {
  constructor(
    @InjectRepository(ProjectionDto)
    private readonly projectionRepo: Repository<ProjectionDto>,
  ) {}

  storeKey: string;

  clear(): number {
    this.projectionRepo
      .save({ streamName: this.storeKey, eventNumber: 0 })
      .then(() => {
        Logger.log(`MongoStore cleared eventNumber ${this.storeKey}`);
      });
    return 0;
  }

  async readExpectedVersion(key: string): Promise<number> {
    const state = await this.projectionRepo.findOne({
      where: { streamName: key }, // Specify the query criteria
      lock: { mode: 'optimistic', version: new Date() },
    });
    return state?.expectedVersion || 0;
  }

  async read(key: string): Promise<number> {
    console.log(key);
    const state = await this.projectionRepo.findOne({
      where: { streamName: key }, // Specify the query criteria
      lock: { mode: 'optimistic', version: new Date() },
    });
    return state?.eventNumber || 0;
  }

  async writeExpectedVersion(
    key: string,
    expectedVersion: number,
  ): Promise<number> {
    this.storeKey = key;
    const projection = await this.projectionRepo.findOne({
      where: {
        streamName: key,
      },
      lock: { mode: 'optimistic', version: new Date() },
    });
    if (projection) {
      return this.projectionRepo
        .save({ ...projection, expectedVersion })
        .then(() => {
          Logger.log(`Store wrote expectedVersion ${key} ${expectedVersion}`);
          return expectedVersion;
        });
    } else {
      return this.projectionRepo
        .save({ streamName: key, eventNumber: expectedVersion })
        .then(() => {
          Logger.log(`Store wrote expectedVersion ${key} ${expectedVersion}`);
          return expectedVersion;
        });
    }
  }

  async write(key: string, value: number): Promise<any> {
    this.storeKey = key;
    const projection = await this.projectionRepo.findOne({
      where: { streamName: key },
      lock: { mode: 'optimistic', version: new Date() },
    });
    if (projection) {
      return this.projectionRepo
        .save({ ...projection, eventNumber: value })
        .then(() => {
          Logger.log(`Store wrote storeKey ${key} ${value}`);
          return value;
        });
    } else {
      return this.projectionRepo
        .save({ streamName: key, eventNumber: value })
        .then(() => {
          Logger.log(`Store wrote storeKey ${key} ${value}`);
          return value;
        });
    }
  }
}
