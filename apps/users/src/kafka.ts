import { EKafkaGroup } from '@libs/common/interfaces';
import { NestApplication } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
export default async function (app: NestApplication) {
  const logger = new Logger();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_HOST],
      },
      consumer: {
        groupId: EKafkaGroup.USER_GROUP,
      },
    },
  });
  await app.startAllMicroservices();
  logger.log('=========================================================');
}
