import { Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
@Module({
  controllers: [],
  providers: [RequestModule],
})
export class CommonModule {}
