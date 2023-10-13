import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { IRequestApp } from '../../interfaces/request.interface';
import { uuid } from '../../constants/uuid';
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  async use(req: IRequestApp, res: Response, next: NextFunction) {
    const id: string = uuid();
    req.__id = id;
    next();
  }
}
