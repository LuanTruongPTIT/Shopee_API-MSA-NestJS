import { Module } from '@nestjs/common';
import { validate } from './config/index';
import { ConfigModule } from '@nestjs/config';
import { DatabaseOptionsService } from '@libs/common/database_mongoose/services/database.options.service';
import { DatabaseOptionModule } from '@libs/common/database_mongoose/database.options.module';
import config from '@libs/common/configs/index';
import { RoleRepositoryModule } from './database/role.repository.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ICreateRoleUseCase } from './domains/usecases/i-create-role.usecase';
import { CreateRoleUseCase } from './domains/usecases/create-role.usecase';
import { RoleController } from './controllers/role.controller';
import { IFindRoleUseCase } from './domains/usecases/i-find-role.usecase';
import { FindRoleUseCase } from './domains/usecases/find-role.usecase';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from '../kafka';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: config,
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
    RoleRepositoryModule,
  ],
  providers: [
    {
      provide: ICreateRoleUseCase,
      useClass: CreateRoleUseCase,
    },
    {
      provide: IFindRoleUseCase,
      useClass: FindRoleUseCase,
    },
  ],
  controllers: [RoleController],
})
export class RoleModule {}
