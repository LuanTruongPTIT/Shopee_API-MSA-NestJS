import { NextFunction, Response } from 'express';
import { IRequestApp } from '../../interfaces/request.interface';
import { HelperNumberService } from '@libs/common/helper/services/helper.number.service';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RequestTimestampMiddleware {
  constructor(
    private readonly helperNumberService: HelperNumberService,
    private readonly helperDateService: HelperDateService,
  ) {}

  async use(
    req: IRequestApp,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    req.__xTimestamp = req['x-timestamp']
      ? this.helperNumberService.create(req['x-timestamp'])
      : undefined;
    req.__timestamp = this.helperDateService.timestamp();
    next();
  }
}
