import { Module } from '@nestjs/common';
import { validate } from './config/index';
import { ConfigModule } from '@nestjs/config';
import { DatabaseOptionsService } from '@libs/common/database_mongoose/services/database.options.service';
import { DatabaseOptionModule } from '@libs/common/database_mongoose/database.options.module';
import config from '@libs/common/configs/index';
import { RoleEntity, RoleSchema } from '../role/database/entities/roles.entity';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: config,
    }),
    /**
     * Database Config
     */

    MongooseModule.forRootAsync({
      // connectionName: 'SDSSS',
      imports: [DatabaseOptionModule],
      inject: [DatabaseOptionsService],
      useFactory: (databaseOptionsService: DatabaseOptionsService) => {
        return databaseOptionsService.createOptions();
      },
    }),
    MongooseModule.forFeature([
      {
        name: RoleEntity.name,
        schema: RoleSchema,
      },
    ]),
  ],
})
export class RoleModule {}
