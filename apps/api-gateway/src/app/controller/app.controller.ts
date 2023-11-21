import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { RequestUserAgent } from '@libs/common/request/decorators/request.decorator';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { IResult } from 'ua-parser-js';
import { Response } from 'express';
import * as jose from 'jose';
import { createPrivateKey } from 'crypto';
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
  ) {
    const newDate = this.helperDateService.create();
    res.cookie('luantruong', '123', {
      sameSite: 'none',
      domain: '127.0.0.1',
    });
    res.redirect('http://127.0.0.1:5500/');
    // return {
    //   _metadata: {
    //     customProperty: {
    //       messageProperties: {
    //         serviceName: this.serviceName,
    //       },
    //     },
    //   },
    //   data: {
    //     userAgent,
    //     date: newDate,
    //     format: this.helperDateService.format(newDate),
    //     timestamp: this.helperDateService.timestamp(newDate),
    //   },
    // };
  }

  @Post('/data')
  async getPost(@Body() data) {
    console.log(data);
    const _privateKey = createPrivateKey({
      key: process.env.PRIVATE_KEY,
      format: 'pem', // hoặc 'der' tùy thuộc vào định dạng của khóa riêng tư
      type: 'pkcs8', // hoặc 'pkcs8' tùy thuộc vào định dạng của khóa riêng tư
    });

    jose
      .compactDecrypt(data.payload, _privateKey)
      .then(({ plaintext, protectedHeader }) => {
        try {
          console.log('Decrypted: ');
          console.log(protectedHeader);
          console.log(new TextDecoder().decode(plaintext));
          console.log('===========================');
        } catch (e) {
          console.error(e);
        }
      })
      .catch((e) => {
        console.log(e);
        console.log('===========================');
      });
    return {
      data: 'OK!',
    };
  }
}
