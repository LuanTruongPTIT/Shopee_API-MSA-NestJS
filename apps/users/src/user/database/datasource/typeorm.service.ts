import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'mongodb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: false,
      // autoLoadEntities: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      connectTimeoutMS: parseInt(process.env.DATABASE_CONNECTION_TIME_OUT),
      directConnection: true,
      // acquireTimeout: parseInt(process.env.DATABASE_ACQUIRE_TIME_OUT),
      // url: 'mongodb+srv://luantruong:123@cluster0.kv5lq7b.mongodb.net/',
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      // synchronize: true,
      // useNewUrlParser: true,
      // logging: true,
    };
  }
}
