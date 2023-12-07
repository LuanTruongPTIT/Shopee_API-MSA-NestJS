import { DatabaseOptionModule } from '@libs/common/database_mongoose/database.options.module';
import { DatabaseOptionsService } from '@libs/common/database_mongoose/services/database.options.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validate } from './config/index';
import databaseConfig from '@libs/common/configs/database.config';
import { LogisticsController } from './controllers/shipping.controller';
import { LogisticsService } from './services/logistics.service';
import { ILogisticServiceInterface } from './interfaces/logistics.services.interface';
import { ShippingMethodRepositoryModule } from './database/logistics.repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [databaseConfig],
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
    ShippingMethodRepositoryModule,
  ],
  controllers: [LogisticsController],
  providers: [
    LogisticsService,
    {
      provide: ILogisticServiceInterface,
      useClass: LogisticsService,
    },
  ],
})
export class LogisticsModule {}
