import { Global, Module } from '@nestjs/common';
import { HelperNumberService } from './services/helper.number.service';
import { HelperHashService } from './services/helper.hash.service';
import { HelperDateService } from './services/helper.date.service';
@Global()
@Module({
  providers: [HelperNumberService, HelperHashService, HelperDateService],
  exports: [HelperNumberService, HelperHashService, HelperDateService],
})
export class HelperModule {}
