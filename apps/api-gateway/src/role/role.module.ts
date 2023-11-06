import { Module } from '@nestjs/common';
import { RoleController } from './controller/role.controller';
import { clientModuleOptions } from './config/kafka';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register(clientModuleOptions)],
  controllers: [RoleController],
})
export class RoleModule {}
