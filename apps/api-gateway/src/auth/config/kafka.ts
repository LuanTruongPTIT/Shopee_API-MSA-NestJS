import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import {
  EKafkaGroup,
  EMicroservice,
} from '@libs/common/interfaces/kafka.interface';

interface IClientKafkaConfig {
  name: string;
  clientId: string;
  groupId: string;
}
const clientKafkaConfig: IClientKafkaConfig[] = [
  {
    name: EMicroservice.GATEWAY_AUTH_SERVICE,
    clientId: EMicroservice.GATEWAY_AUTH_SERVICE,
    groupId: EKafkaGroup.AUTH_GROUP,
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
