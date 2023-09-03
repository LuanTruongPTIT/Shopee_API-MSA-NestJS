/* eslint-disable no-unused-vars */
export enum EMicroservice {
  // eslint-disable-next-line no-unused-vars
  GATEWAY_USER_SERVICE = 'GATEWAY_USER_SERVICE',
  // eslint-disable-next-line no-unused-vars
  GATEWAY_SERVICE = 'GATEWAY_SERVICE',
  GATEWAY_TOKEN_SERVICE = 'GATEWAY_TOKEN_SERVICE',
  GATEWAY_AUTH_SERVICE = 'GATEWAY_AUTH_SERVICE',
}

export enum EKafkaGroup {
  // eslint-disable-next-line no-unused-vars
  USER_GROUP = 'USER_GROUP',
  GATEWAY_GROUP = 'GATEWAY_GROUP',
  TOKEN_GROUP = 'TOKEN_GROUP',
  AUTH_GROUP = 'AUTH_GROUP',
}
export enum EKafkaMessage {
  // eslint-disable-next-line no-unused-vars
  REQUEST_LOGIN = 'REQUEST_LOGIN',
  REQUEST_CREATE_USER = 'REQUEST_CREATE_USER',
}
