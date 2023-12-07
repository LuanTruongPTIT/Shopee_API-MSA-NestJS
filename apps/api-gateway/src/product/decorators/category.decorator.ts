import { IFile } from '@libs/common/file/interface/file.interface';
import {
  ExecutionContext,
  SetMetadata,
  UseInterceptors,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';
import { CacheInterceptor } from '../interceptor/cache.interceptor';
import { KEY_REDIS_GET_ALL_CATEGORY } from '@libs/common/response/constants/response.constant';
export const GetFileImage = createParamDecorator(
  <T>(returnPlain: boolean, ctx: ExecutionContext): IFile[] => {
    const results: Array<any> = (ctx.switchToHttp().getRequest() as Request)
      .body;

    const payload = results.map((result) => {
      console.log(result);
      return result.image;
    });
    console.log(payload);
    return payload;
  },
);

export const TestDecor = createParamDecorator(
  <T>(returnPlain: boolean, ctx: ExecutionContext) => {
    console.log('Test decor 1');
  },
);

export function GetAllCategoryDecorator(): MethodDecorator {
  return applyDecorators(
    UseInterceptors(CacheInterceptor),
    SetMetadata(KEY_REDIS_GET_ALL_CATEGORY, 'category'),
  );
}
