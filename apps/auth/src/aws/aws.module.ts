import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESClient } from '@aws-sdk/client-ses';
import { AwsSesService } from './aws.ses.service';
import { AWSSendEmailRepository } from './aws.repository';
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'AWS_SES',
      useFactory: (configService: ConfigService) => {
        return new SESClient({
          region: process.env.awsRegion,
          credentials: {
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          },
        });
      },
    },
    AwsSesService,
    AWSSendEmailRepository,
  ],
  exports: [AwsSesService],
})
export class AwsModule {}
