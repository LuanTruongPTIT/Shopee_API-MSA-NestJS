import { Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [RequestModule, HelperModule],
  controllers: [],
  providers: [],
})
export class CommonModule {}
