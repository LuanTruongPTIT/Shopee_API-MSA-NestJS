/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ResponseDefaultSerialization,
  ResponseMetadataSerialization,
} from '../serializations/response.default.serialization';
import { Observable, map, switchMap } from 'rxjs';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { IRequestApp } from '../../request/interfaces/request.interface';
import { Response } from 'express';
import {
  RESPONSE_MESSAGE_PATH_META_KEY,
  RESPONSE_SERIALIZATION_META_KEY,
  RESPONSE_MESSAGE_PROPERTIES_META_KEY,
  RESPONSE_SERIALIZATION_OPTIONS_META_KEY,
  RESPONSE_CACHE_KEY_META_KEY,
  CACHE_MISS_METADATA_KEY,
  TIME_TO_LIVE_CACHE_METADATA_KEY,
} from '../constants/response.constant';
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { IResponse } from '../interfaces/response.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Injectable()
export class ResponseDefaultInterceptor<T>
  implements NestInterceptor<Promise<T>>
{
  constructor(
    private readonly reflector: Reflector, // private readonly messageService:
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Promise<ResponseDefaultSerialization>>> {
    if (context.getType() === 'http') {
      return next.handle().pipe(
        map(async (res: Promise<Record<string, any>>) => {
          const ctx: HttpArgumentsHost = context.switchToHttp();
          const response: Response = ctx.getResponse();
          const request: IRequestApp = ctx.getRequest<IRequestApp>();

          const classSerialization: ClassConstructor<any> = this.reflector.get<
            ClassConstructor<any>
          >(RESPONSE_SERIALIZATION_META_KEY, context.getHandler());

          const classSerializationOptions: ClassTransformOptions =
            this.reflector.get<ClassTransformOptions>(
              RESPONSE_SERIALIZATION_OPTIONS_META_KEY,
              context.getHandler(),
            );

          const __customLang = request.__customLang;
          const __requestId = request.__id;
          const __path = request.path;
          const __timestamp = request.__xTimestamp ?? request.__timestamp;
          const __timezone = request.__timezone;
          const __version = request.__version;
          const __repoVersion = request.__repoVersion;

          let httpStatus: HttpStatus = response.statusCode;
          let statusCode: number = response.statusCode;
          let data: Record<string, any>;
          let metadata: ResponseMetadataSerialization = {
            languages: __customLang,
            timestamp: __timestamp,
            timezone: __timezone,
            requestId: __requestId,
            path: __path,
            version: __version,
            repoVersion: __repoVersion,
          };
          const responseData = (await res) as IResponse;

          const isCache = this.reflector.get<boolean>(
            RESPONSE_CACHE_KEY_META_KEY,
            context.getHandler(),
          );
          if (isCache) {
            const cacheMiss = this.reflector.get<string>(
              CACHE_MISS_METADATA_KEY,
              context.getHandler(),
            );
            if (cacheMiss) {
              const ttl = this.reflector.get<number>(
                TIME_TO_LIVE_CACHE_METADATA_KEY,
                context.getHandler(),
              );
              const key = request.url;

              await this.cacheManager.set(key, responseData, ttl);
            }
          }

          if (responseData) {
            const { _metadata } = responseData;
            data = responseData.data;

            if (data && classSerialization) {
              data = plainToInstance(
                classSerialization,
                data,
                classSerializationOptions,
              );
            }
            httpStatus = _metadata?.customProperty?.httpStatus ?? httpStatus;
            statusCode = _metadata?.customProperty?.statusCode ?? statusCode;
            // messagePath = _metadata?.customProperty?.message ?? messagePath;
            // messageProperties =
            //   _metadata?.customProperty?.messageProperties ?? messageProperties;

            delete _metadata?.customProperty;

            metadata = {
              ...metadata,
              ..._metadata,
            };
          }
          response.status(httpStatus);

          return {
            statusCode,
            // message,
            _metadata: metadata,
            data,
          };
        }),
      );
    }
    return next.handle();
  }
}
