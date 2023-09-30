import { getMetadataArgsStorage } from 'typeorm';

export function ormConfig(): any {
  return {
    type: process.env.DATABASE_TYPE,
    // type: 'mongodb',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    directConnection: true,
    connectTimeout: parseInt(process.env.DATABASE_CONNECTION_TIME_OUT),
    acquireTimeout: parseInt(process.env.DATABASE_ACQUIRE_TIME_OUT),
    extra: {
      connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT),
    },
    entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
  };
}
