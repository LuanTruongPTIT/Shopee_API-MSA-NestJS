/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
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
} from '../constants/response.constant';
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { IResponse } from '../interfaces/response.interface';
@Injectable()
export class ResponseDefaultInterceptor<T>
  implements NestInterceptor<Promise<T>>
{
  constructor(
    private readonly reflector: Reflector, // private readonly messageService:
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
          console.log('res', res);
          // let messagePath: string = this.reflector.get<string>(
          //   RESPONSE_MESSAGE_PATH_META_KEY,
          //   context.getHandler(),
          // );
          const classSerialization: ClassConstructor<any> = this.reflector.get<
            ClassConstructor<any>
          >(RESPONSE_SERIALIZATION_META_KEY, context.getHandler());
          console.log(context.getHandler());
          const classSerializationOptions: ClassTransformOptions =
            this.reflector.get<ClassTransformOptions>(
              RESPONSE_SERIALIZATION_OPTIONS_META_KEY,
              context.getHandler(),
            );
          // metadata
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
          console.log(responseData);
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
