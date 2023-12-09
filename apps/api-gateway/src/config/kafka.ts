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
    name: EMicroservice.GATEWAY_AUTH_SERVICE,
    clientId: EMicroservice.GATEWAY_AUTH_SERVICE,
    groupId: EKafkaGroup.AUTH_GROUP,
  },
  {
    name: EMicroservice.GATEWAY_PRODUCT_SERVICE,
    clientId: EMicroservice.GATEWAY_PRODUCT_SERVICE,
    groupId: EKafkaGroup.PRODUCT_GROUP,
  },
  {
    name: EMicroservice.GATEWAY_ROLE_SERVICE,
    clientId: EMicroservice.GATEWAY_ROLE_SERVICE,
    groupId: EKafkaGroup.ROLE_GROUP,
  },
  {
    name: EMicroservice.GATEWAY_LOGISTICS_SERVICE,
    clientId: EMicroservice.GATEWAY_LOGISTICS_SERVICE,
    groupId: EKafkaGroup.LOGISTICS_GROUP,
  },
  {
    name: EMicroservice.GATEWAY_SELLER_CHANNEL_SERVICE,
    clientId: EMicroservice.GATEWAY_SELLER_CHANNEL_SERVICE,
    groupId: EKafkaGroup.SELLER_CHANNEL_GROUP,
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
