import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { IRequestApp } from '../../interfaces/request.interface';
export class RequestTimeZoneMiddleware implements NestMiddleware {
  async use(
    req: IRequestApp,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    req.__timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    next();
  }
}
