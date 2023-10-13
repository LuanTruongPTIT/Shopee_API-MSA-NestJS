import { NestApplication } from '@nestjs/core';
import {
  ClientsModuleOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { EKafkaGroup, EMicroservice } from '@libs/common/interfaces';
import { Logger } from '@nestjs/common';
export default async function (app: NestApplication) {
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
  Logger.log('Async Start All Microserivces');
  await app.startAllMicroservices();
}
interface IClientKafkaConfig {
  name: string;
  clientId: string;
  groupId: string;
}
const clientKafkaConfig: IClientKafkaConfig[] = [
  {
    name: EMicroservice.GATEWAY_ROLE_SERVICE,
    clientId: EMicroservice.GATEWAY_ROLE_SERVICE,
    groupId: EKafkaGroup.ROLE_GROUP,
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
