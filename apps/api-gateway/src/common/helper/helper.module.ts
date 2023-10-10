import { Global, Module } from '@nestjs/common';
import { HelperNumberService } from '../helper/services/helper.number.service';
@Global()
@Module({
  providers: [HelperNumberService],
  exports: [HelperNumberService],
})
export class HelperModule {}
