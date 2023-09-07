import { SESClient } from '@aws-sdk/client-ses';
import { Inject, Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { AWSSendEmailRepository } from './aws.repository';
@Injectable()
export class AwsSesService {
  private verifyEmailTemplate: string;
  constructor(
    private readonly awsSendEmailRepository: AWSSendEmailRepository,
    @Inject('AWS_SES')
    private readonly sesClient: SESClient,
  ) {
    this.readVerifyEmailTemplate();
  }

  private readVerifyEmailTemplate(): string {
    if (!this.readVerifyEmailTemplate) {
      this.verifyEmailTemplate = fs.readFileSync(
        path.resolve('src/templates/verify-email.html'),
        'utf8',
      );
    }
    return this.verifyEmailTemplate;
  }

  async sendVerifyEmail(toAddress: string, subject: string, body: string) {
    const sendEmailCommand = this.awsSendEmailRepository.createSendEmailCommand(
      {
        fromAddress: process.env.SES_FROM_ADDRESS,
        toAddresses: toAddress,
        body,
        subject,
      },
    );
    return this.sesClient.send(sendEmailCommand);
  }

  async sendVerifyRegisterEmail(toAddress: string, email_verify_token: string) {
    return this.sendVerifyEmail(
      toAddress,
      'Verify your email',
      this.verifyEmailTemplate
        .replace('{{title}}', 'Please verify your email')
        .replace('{{content}}', 'Click the button below to verify your email')
        .replace('{{titleLink}}', 'Verify')
        .replace(
          '{{link}}',
          `${process.env.CLIENT_URL}/email-verifications?token=${email_verify_token}`,
        ),
    );
  }
}
