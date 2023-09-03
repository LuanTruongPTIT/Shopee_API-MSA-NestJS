import { EKafkaGroup } from '@libs/common/interfaces';
import { Logger } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
export default async function (app: NestApplication) {
  const logger = new Logger();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_HOST],
      },
      consumer: {
        groupId: EKafkaGroup.AUTH_GROUP,
      },
    },
  });
  await app.startAllMicroservices();
  logger.log('Auth Service');
}
