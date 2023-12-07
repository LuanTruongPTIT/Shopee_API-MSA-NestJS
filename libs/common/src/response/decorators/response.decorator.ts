import { SetMetadata, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ResponseDefaultInterceptor } from '../interceptors/response.default.interceptor';
import { IResponseOptions } from '../interfaces/response.interface';
import {
  RESPONSE_MESSAGE_PATH_META_KEY,
  RESPONSE_SERIALIZATION_META_KEY,
  RESPONSE_CACHE_KEY_META_KEY,
  TIME_TO_LIVE_CACHE_METADATA_KEY,
} from '../constants/response.constant';

export function Response<T>(
  messagePath: string,
  options?: IResponseOptions<T>,
): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ResponseDefaultInterceptor<T>),
    SetMetadata(RESPONSE_MESSAGE_PATH_META_KEY, messagePath),
    SetMetadata(RESPONSE_SERIALIZATION_META_KEY, options?.serialization),
    SetMetadata(RESPONSE_CACHE_KEY_META_KEY, options?.optionsCache?.isCache),
    SetMetadata(TIME_TO_LIVE_CACHE_METADATA_KEY, options?.optionsCache?.ttl),
    // SetMetadata(
    //   RESPONSE_MESSAGE_PROPERTIES_META_KEY,
    //   options?.messageProperties,
    // ),
  );
}
export function Response2<T>(): MethodDecorator {
  console.log(1);
  return applyDecorators();
}
