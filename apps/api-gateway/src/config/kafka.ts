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
    name: EMicroservice.GATEWAY_USER_SERVICE,
    clientId: EMicroservice.GATEWAY_USER_SERVICE,
    groupId: EKafkaGroup.USER_GROUP,
  },
  {
    name: EMicroservice.GATEWAY_TOKEN_SERVICE,
    clientId: EMicroservice.GATEWAY_TOKEN_SERVICE,
    groupId: EKafkaGroup.TOKEN_GROUP,
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
