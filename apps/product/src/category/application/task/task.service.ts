import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCronRefreshCacheGetAllCategory() {
    this.logger.debug('Called when the second is 10');
    // const key = '/api/v1/product';
    // const ttl = await this.cache.ttl();
  }
}
