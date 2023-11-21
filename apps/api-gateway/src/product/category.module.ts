import { Module } from '@nestjs/common';

import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from './config/kafka';

@Module({
  imports: [ClientsModule.register(clientModuleOptions)],
  controllers: [],
})
export class CategoryModule {}
