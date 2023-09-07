import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from '@libs/infra/database/postgresql/naming.strategy';
import _ from 'lodash';
import { DataSource } from 'typeorm';
const configService = new ConfigService({});
export const typeormConfig: DataSourceOptions & TypeOrmModuleOptions = {
  entities: [__dirname + '../entities/*{.ts,.js}'],
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: _.parseInt(configService.get('DB_PORT'), 10),
  username: configService.get('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  // autoLoadEntities: true,
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTransactionMode: 'each',
  synchronize: true,
};
const dataSource = new DataSource(typeormConfig);
export default dataSource;
