import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from '../config/kafka';
import { UserController } from './user.controller';
@Module({
  imports: [ClientsModule.register(clientModuleOptions)],
  controllers: [UserController],
})
export class ControllerModule {}
