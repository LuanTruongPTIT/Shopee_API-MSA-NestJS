import { getMetadataArgsStorage } from 'typeorm';
import { DataSourceOptions, DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: DataSourceOptions & TypeOrmModuleOptions = {
  type: 'mongodb',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  autoLoadEntities: true,
  directConnection: true,
  extra: {
    connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT),
  },
  entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
};
export const datasource = new DataSource(typeormConfig);
console.log(getMetadataArgsStorage().tables.map((tbl) => tbl.target));
