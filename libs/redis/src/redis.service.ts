import { Inject, Injectable } from '@nestjs/common';
import Redis, { RedisKey } from 'ioredis';
import {
  REDIS_SUBSCRIBER_CLIENT,
  REDIS_PUBLISHER_CLIENT,
} from './redis.constants';
import { Observable, Observer, filter, map } from 'rxjs';
export interface IRedisSubscribeMessage {
  readonly message: string;
  readonly channel: string;
}
@Injectable()
export class RedisService {
  public constructor(
    @Inject(REDIS_SUBSCRIBER_CLIENT) private readonly subClient: Redis,
    @Inject(REDIS_PUBLISHER_CLIENT) private readonly pubClient: Redis,
  ) {}

  public fromEvent<T>(eventName: string): Observable<T> {
    this.subClient.subscribe(eventName);
    return new Observable((observer: Observer<IRedisSubscribeMessage>) => {
      this.subClient.on('message', (channel, message) =>
        observer.next({ channel, message }),
      );
    }).pipe(
      filter(({ channel }) => channel === eventName),
      map(({ message }) => JSON.parse(message)),
    );
  }

  public async publish(channel: string, value: unknown): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.pubClient.publish(
        channel,
        JSON.stringify(value),
        (error, reply) => {
          if (error) {
            return reject(error);
          }
          return resolve(reply);
        },
      );
    });
  }

  public async get<T = any>(key: RedisKey) {
    const res = await this.pubClient.get(key);
    return (await JSON.parse(res)) as string | number;
  }

  public async hset(key: RedisKey, field: string, value: string) {
    return await this.pubClient.hset(key, field, value);
  }

  public async set(key: RedisKey, value: string | number, expire?: number) {
    return await this.pubClient.set(key, value, 'EX', expire);
  }
}
