import { CACHE_KEY_METADATA, CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    // const cacheKey = this.reflector.get(
    //   CACHE_KEY_METADATA,
    //   context.getHandler(),
    // );
    const cacheKey = 'uuid1223';
    if (cacheKey) {
      const request = context.switchToHttp().getRequest();
      console.log(request);
      return `${cacheKey}-${request._parsedUrl}`;
    }

    return super.trackBy(context);
  }
}
