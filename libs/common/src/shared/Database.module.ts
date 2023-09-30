import {
  DataSource,
  EntityManager,
  QueryRunner,
  getMetadataArgsStorage,
} from 'typeorm';
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Module,
} from '@nestjs/common';

export interface WriteConnection {
  readonly startTransaction: (
    level?:
      | 'READ UNCOMMITTED'
      | 'READ COMMITTED'
      | 'REPEATABLE READ'
      | 'SERIALIZABLE',
  ) => Promise<void>;
  readonly commitTransaction: () => Promise<void>;
  readonly rollbackTransaction: () => Promise<void>;
  readonly isTransactionActive: boolean;
  // readonly connnect: () => Promise<any>;
  readonly manager: EntityManager;
}
export let writeConnection = {} as WriteConnection;
export class DbTransaction implements OnModuleInit, OnModuleDestroy {
  // private queryRunner = this.dataSource.createQueryRunner();
  private readonly dataSource = new DataSource({
    type: 'mongodb',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    // autoLoadEntities: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    directConnection: true,
    // connectTimeout: parseInt(process.env.DATABASE_CONNECTION_TIME_OUT),
    // acquireTimeout: parseInt(process.env.DATABASE_ACQUIRE_TIME_OUT),
    extra: {
      connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT),
    },
    entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
  });

  async onModuleInit(): Promise<void> {
    await this.dataSource.initialize();
    writeConnection = this.dataSource.createQueryRunner();
  }

  async onModuleDestroy(): Promise<void> {
    await this.dataSource.destroy();
  }
}

@Module({
  providers: [DbTransaction],
})
export class DatabaseModule {}
