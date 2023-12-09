import { Module } from '@nestjs/common';
import { SellerChannelService } from './services/seller_channel.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseOptionModule } from '@libs/common/database_mongoose/database.options.module';
import { DatabaseOptionsService } from '@libs/common/database_mongoose/services/database.options.service';
import databaseConfig from '@libs/common/configs/database.config';
import { validate } from './config/index';
import { SellerChannelRepositoryModule } from './database/seller_channel.repository.module';
import { ISellerChannelServiceInterface } from './interfaces/ISeller_channel.interface';
import { SellerChannelController } from './controllers/seller_channel.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [databaseConfig],
    }),

    MongooseModule.forRootAsync({
      imports: [DatabaseOptionModule],
      inject: [DatabaseOptionsService],
      useFactory: (databaseOptionsService: DatabaseOptionsService) => {
        return databaseOptionsService.createOptions();
      },
    }),
    SellerChannelRepositoryModule,
  ],
  controllers: [SellerChannelController],
  providers: [
    SellerChannelService,
    {
      provide: ISellerChannelServiceInterface,
      useClass: SellerChannelService,
    },
  ],
})
export class SellerChannelModule {}
