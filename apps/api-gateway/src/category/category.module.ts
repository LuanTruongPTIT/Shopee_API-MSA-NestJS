import { Module } from '@nestjs/common';
import { CategoryController } from './controller/category.controller';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from './config/kafka';

@Module({
  imports: [ClientsModule.register(clientModuleOptions)],
  controllers: [CategoryController],
})
export class CategoryModule {}
