import { MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { IDatabaseOptionsService } from '../interfaces/database.options-service.interface';
@Injectable()
export class DatabaseOptionsService implements IDatabaseOptionsService {
  constructor(private readonly configService: ConfigService) {}
  createOptions(): MongooseModuleOptions {
    const host = this.configService.get<string>('database.host');
    const name = this.configService.get<string>('database.name');
    const options = this.configService.get<string>('database.options')
      ? `?${this.configService.get<string>('database.options')}`
      : '';

    let uri = `${host}`;
    if (name) {
      uri = `${uri}/${name}${options}`;
    }
    const mongooseOptions: MongooseModuleOptions = {
      uri,
      serverSelectionTimeoutMS: 5000,
      autoCreate: true,
    };
    return mongooseOptions;
  }
}
