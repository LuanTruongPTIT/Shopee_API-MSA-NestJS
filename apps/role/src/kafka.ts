import { Logger } from '@nestjs/common';
import { EKafkaGroup, EMicroservice } from '@libs/common/interfaces/';
import { NestApplication } from '@nestjs/core';
import {
  ClientsModuleOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
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
interface IClientKafkaConfig {
  name: string;
  clientId: string;
  groupId: string;
}
const clientKafkaConfig: IClientKafkaConfig[] = [
  {
    name: EMicroservice.AUTH_SERVICE,
    clientId: EMicroservice.AUTH_SERVICE,
    groupId: EKafkaGroup.ROLE_GROUP_1,
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
