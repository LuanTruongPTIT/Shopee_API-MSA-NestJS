import { Module } from '@nestjs/common';
import { validate } from './config/index';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import datasource, { typeormConfig } from './database/datasource/index';
import { RoleEntity } from './database/entities/roles.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    /**
     * Database Config
     */
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormConfig,
      dataSourceFactory: async () => {
        datasource.initialize();
        return datasource;
      },
    }),
    TypeOrmModule.forFeature([RoleEntity]),
  ],
})
export class RoleModule {}
