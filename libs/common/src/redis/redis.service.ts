import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { Cache } from 'cache-manager';
@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  async get(key: string) {
    return await this.cache.get(key);
  }

  async remove(key: string) {
    await this.cache.del(key);
  }

  async reset() {
    await this.cache.reset();
  }

  async set(key: string, value: string, ttlInSeconds?: number) {
    await this.cache.set(key, value, ttlInSeconds);
  }
}
