import { Module } from '@nestjs/common';
import { validate } from './config/index';
import { ConfigModule } from '@nestjs/config';
import { DatabaseOptionsService } from '@libs/common/database_mongoose/services/database.options.service';
import { DatabaseOptionModule } from '@libs/common/database_mongoose/database.options.module';
import config from '@libs/common/configs/index';
import { RoleRepositoryModule } from './database/role.repository.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '@libs/common/database_mongoose/constants/database.constant';
import { ICreateRoleUseCase } from './domains/usecases/i-create-role.usecase';
import { CreateRoleUseCase } from './domains/usecases/create-role.usecase';
import { RoleController } from './controllers/role.controller';
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
      // connectionName: DATABASE_CONNECTION_NAME,
      imports: [DatabaseOptionModule],
      inject: [DatabaseOptionsService],
      useFactory: (databaseOptionsService: DatabaseOptionsService) => {
        return databaseOptionsService.createOptions();
      },
    }),
    RoleRepositoryModule,
  ],
  providers: [
    {
      provide: ICreateRoleUseCase,
      useClass: CreateRoleUseCase,
    },
  ],
  controllers: [RoleController],
})
export class RoleModule {}
