import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'mongodb',
      url: 'mongodb+srv://luantruong:123@cluster0.kv5lq7b.mongodb.net/',
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    };
  }
}
