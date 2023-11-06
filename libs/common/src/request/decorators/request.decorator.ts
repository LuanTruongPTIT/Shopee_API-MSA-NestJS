import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IResult } from 'ua-parser-js';
import { IRequestApp } from '../interfaces/request.interface';

export const RequestUserAgent: () => ParameterDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext): IResult => {
    const { __userAgent } = ctx.switchToHttp().getRequest<IRequestApp>();
    return __userAgent;
  },
);
