import { RedisKey } from 'ioredis';

export interface ICacheRedisService<T> {
  get<T = any>(key: RedisKey): Promise<T>;
}
