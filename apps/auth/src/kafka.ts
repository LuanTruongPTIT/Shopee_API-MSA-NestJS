import { EKafkaGroup, EMicroservice } from '@libs/common/interfaces';
import { Logger } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import {
  ClientsModuleOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
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
interface IClientKafkaConfig {
  name: string;
  clientId: string;
  groupId: string;
}
const clientKafkaConfig: IClientKafkaConfig[] = [
  {
    name: EMicroservice.USER_SERVICE,
    clientId: EMicroservice.USER_SERVICE,
    groupId: EKafkaGroup.USER_GROUP_1,
  },
  {
    name: EMicroservice.ROLE_SERVICE,
    clientId: EMicroservice.ROLE_SERVICE,
    groupId: EKafkaGroup.ROLE_GROUP_2,
  },
];
export const clientModuleOptions: ClientsModuleOptions = clientKafkaConfig.map(
  (config) => {
    return {
      name: config.name,
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: config.clientId,
          brokers: [process.env.KAFKA_HOST],
        },
        consumer: {
          groupId: config.groupId,
        },
      },
    };
  },
);
