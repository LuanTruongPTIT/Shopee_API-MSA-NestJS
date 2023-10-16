import { Module } from '@nestjs/common';
import { validate } from './index';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: configService.get('EMAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get('EMAIL_ADDRESS'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
          tls: { rejectUnauthorized: false },
        },
        defaults: { from: '"NestJS Mailer"<test@test.com' },
        // template: {
        //   dir: __dirname + '/templates',
        //   // adapter: new HandlebarsAdapter(),
        //   options: { strict: true },
        // },
      }),
    }),
    BullModule.registerQueue({
      name: 'MAIL_QUEUE',
    }),
  ],
})
export class MailModule {}
