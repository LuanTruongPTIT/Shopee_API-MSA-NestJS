import { IFile } from '@libs/common/file/interface/file.interface';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
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
