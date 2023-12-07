import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  Inject,
  SetMetadata,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import {
  CACHE_MISS_METADATA_KEY,
  KEY_REDIS_GET_ALL_CATEGORY,
} from '@libs/common/response/constants/response.constant';
import { IRequestApp } from '@libs/common/request/interfaces/request.interface';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
    private readonly reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const request = ctx.getRequest<IRequestApp>();

    const key = request.url;

    const data = await this.cache.get(key);

    if (data) {
      return of(data);
    }
    SetMetadata(CACHE_MISS_METADATA_KEY, true)(context.getHandler());
    return next.handle();
  }
}
