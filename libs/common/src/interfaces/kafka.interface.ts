/* eslint-disable no-unused-vars */
export enum EMicroservice {
  GATEWAY_USER_SERVICE = 'GATEWAY_USER_SERVICE',
  GATEWAY_SERVICE = 'GATEWAY_SERVICE',
  GATEWAY_TOKEN_SERVICE = 'GATEWAY_TOKEN_SERVICE',
  GATEWAY_AUTH_SERVICE = 'GATEWAY_AUTH_SERVICE',
  GATEWAY_ROLE_SERVICE = 'GATEWAY_ROLE_SERVICE',
  GATEWAY_PRODUCT_SERVICE = 'GATEWAY_PRODUCT_SERVICE',
  GATEWAY_CATEGORY_SERVICE = 'GATEWAY_CATEGORY_SERVICE',
  GATEWAY_USER_V2_SERVICE = 'GATEWAY_USER_V2_SERVICE',
  GATEWAY_LOGISTICS_SERVICE = 'GATEWAY_LOGISTICS_SERVICE',
  ROLE_SERVICE = 'ROLE_SERVICE',
  ROLE_SERVICE_1 = 'ROLE_SERVICE_1',
  USER_SERVICE = 'USER_SERVICE',
  SEND_EMAIL_SERVICE = 'SEND_EMAIL_SERVICE',
  AUTH_SERVICE = 'AUTH_SERVICE',
  GATEWAY_SELLER_CHANNEL_SERVICE = 'SELLER_CHANNEL_GROUP',
}

export enum EKafkaGroup {
  USER_GROUP = 'USER_GROUP',
  GATEWAY_GROUP = 'GATEWAY_GROUP',
  TOKEN_GROUP = 'TOKEN_GROUP',
  AUTH_GROUP = 'AUTH_GROUP',
  ROLE_GROUP = 'ROLE_GROUP',
  PRODUCT_GROUP = 'PRODUCT_GROUP',
  CATEGORY_GROUP = 'CATEGORY_GROUP',
  USER_V2_GROUP = 'USER_V2_GROUP',
  ROLE_GROUP_1 = 'ROLE_GROUP_1',
  ROLE_GROUP_2 = 'ROLE_GROUP_2',
  SEND_EMAIL_GROUP = 'SEND_EMAIL_GROUP',
  USER_GROUP_1 = 'USER_GROUP_1',
  LOGISTICS_GROUP = 'LOGISTICS_GROUP',
  SELLER_CHANNEL_GROUP = 'SELLER_CHANNEL_GROUP',
}
export enum EKafkaMessage {
  REQUEST_LOGIN = 'REQUEST_LOGIN',
  REQUEST_CREATE_USER = 'REQUEST_CREATE_USER',
  REQUEST_SEND_VERIFY_EMAIL = 'REQUEST_SEND_VERIFY_EMAIL',
  REQUEST_VERIFY_EMAIL = 'REQUEST_VERIFY_EMAIL',
  REQUEST_USER_BY_ID = 'REQUEST_USER_BY_ID',
  REQUEST_ADD_PRODUCT = 'REQUEST_ADD_PRODUCT',
  REQUEST_ADD_CATEGORY_PRODUCT = 'REQUEST_ADD_CATEGORY_PRODUCT',
  REQUEST_GET_ALL_CATEGORY = 'REQUEST_GET_ALL_CATEGORY',
  REQUEST_ADD_ATTRIBUTE_CATEGORY = 'REQUEST_ADD_ATTRIBUTE_CATEGORY',
  REQUEST_CREATE_ROLE = 'REQUEST_CREATE_ROLE',
  REQUEST_CREATE_USER_V2 = 'REQUEST_CREATE_USER_V2',
  REQUEST_FIND_ROLE_BY_NAME = 'REQUEST_FIND_ROLE_BY_NAME',
  REQUEST_FIND_ROLE_BY_ID = 'REQUEST_FIND_ROLE_BY_ID',
  REQUEST_CONFIRM_EMAIL = 'REQUEST_CONFIRM_EMAIL',
  REQUEST_FIND_BY_EMAIL = 'REQUEST_FIND_BY_EMAIL',
  REQUEST_REFRESH_TOKEN = 'REQUEST_REFRESH_TOKEN',
  REQUEST_LOGOUT = 'REQUEST_LOGOUT',
  REQUEST_CREATE_SHIPPING_METHOD = 'REQUEST_CREATE_SHIPPING_METHOD',
  REQUEST_CREATE_SHOP_SELLER_CHANNEL = 'REQUEST_CREATE_SHOP_SELLER_CHANNEL',
}
