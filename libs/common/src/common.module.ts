import { Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { HelperModule } from './helper/helper.module';
@Module({
  controllers: [],
  providers: [RequestModule, HelperModule],
})
export class CommonModule {}
