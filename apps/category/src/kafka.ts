import { NestApplication } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EKafkaGroup } from '@libs/common/interfaces';
import { Logger } from '@nestjs/common';
export default async function (app: NestApplication) {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_HOST],
      },
      consumer: {
        groupId: EKafkaGroup.CATEGORY_GROUP,
      },
    },
  });
  Logger.log('Async Start All Microserivces');
  await app.startAllMicroservices();
}
