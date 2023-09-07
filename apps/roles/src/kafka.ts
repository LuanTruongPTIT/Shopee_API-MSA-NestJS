import { Logger } from '@nestjs/common';
import { EKafkaGroup } from '@libs/common/interfaces/';
import { NestApplication } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
export default async function (app: NestApplication) {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_HOST],
      },
      consumer: {
        groupId: EKafkaGroup.ROLE_GROUP,
      },
    },
  });
  await app.startAllMicroservices();
  Logger.log('Kafka Role');
}
