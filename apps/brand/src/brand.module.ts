import { DatabaseOptionModule } from '@libs/common/database_mongoose/database.options.module';
import { DatabaseOptionsService } from '@libs/common/database_mongoose/services/database.options.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validate } from './config/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    // ClientsModule.register(clientModuleOptions),
    /**
     * Database Config
     */

    MongooseModule.forRootAsync({
      imports: [DatabaseOptionModule],
      inject: [DatabaseOptionsService],
      useFactory: (databaseOptionsService: DatabaseOptionsService) => {
        return databaseOptionsService.createOptions();
      },
    }),
  ],
})
export class LogisticsModule {}
