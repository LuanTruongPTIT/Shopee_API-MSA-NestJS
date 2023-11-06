import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { RequestUserAgent } from '@libs/common/request/decorators/request.decorator';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { IResult } from 'ua-parser-js';
import { Response } from 'express';

@ApiTags('test-app')
@Controller('/')
export class AppController {
  private readonly serviceName: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly helperDateService: HelperDateService,
  ) {
    this.serviceName = this.configService.get<string>('app.name');
  }

  @Get('/hello')
  async hello(
    @RequestUserAgent() userAgent: IResult,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IResponse> {
    const newDate = this.helperDateService.create();
    res.cookie('luantruong', '123');
    return {
      _metadata: {
        customProperty: {
          messageProperties: {
            serviceName: this.serviceName,
          },
        },
      },
      data: {
        userAgent,
        date: newDate,
        format: this.helperDateService.format(newDate),
        timestamp: this.helperDateService.timestamp(newDate),
      },
    };
  }
}
