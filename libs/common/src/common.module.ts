import { Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [HelperModule, RequestModule],
  controllers: [],
  providers: [],
})
export class CommonModule {}
