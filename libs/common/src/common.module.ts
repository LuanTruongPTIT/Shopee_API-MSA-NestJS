import { Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { HelperModule } from './helper/helper.module';
import { PolicyModule } from './policy/policy.module';

@Module({
  imports: [HelperModule, RequestModule, PolicyModule],
  controllers: [],
  providers: [],
})
export class CommonModule {}
