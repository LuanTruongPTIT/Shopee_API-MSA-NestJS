import { emailHandler } from './emai.interfaces';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AWSSendEmailRepository implements emailHandler {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  createSendEmailCommand({
    fromAddress,
    toAddresses,
    ccAddresses = [],
    body,
    subject,
    replyToAddresses = [],
  }: {
    fromAddress: string;
    toAddresses: string | string[];
    ccAddresses?: string | string[];
    body: string;
    subject: string;
    replyToAddresses?: string | string[];
  }) {
    return new SendEmailCommand({
      Destination: {
        CcAddresses: ccAddresses instanceof Array ? ccAddresses : [ccAddresses],
        ToAddresses: toAddresses instanceof Array ? toAddresses : [toAddresses],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: fromAddress,
      ReplyToAddresses:
        replyToAddresses instanceof Array
          ? replyToAddresses
          : [replyToAddresses],
    });
  }
}
