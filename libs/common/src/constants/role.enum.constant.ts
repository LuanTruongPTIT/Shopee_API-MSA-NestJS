/* eslint-disable no-unused-vars */
export enum ENUM_ROLE_TYPE {
  SHOP = 'SHOP',
  BUYER = 'BUYER',
  ADMIN = 'ADMIN',
}
export enum ENUM_POLICY_ACTION {
  MANAGE = 'manage',
  READ = 'read',
  SHOP = 'shop',
  UPDATE = 'update',
  DELETE = 'delete',
}
export enum ENUM_POLICY_REQUEST_ACTION {
  MANAGE,
  READ,
  CREATE,
  UPDATE,
  DELETE,
  EXPORT,
  IMPORT,
}
export enum ENUM_POLICY_SUBJECT {
  API_KEY = 'API_KEY',
  SETTING = 'SETTING',
  ROLE = 'ROLE',
  USER = 'USER',
  SHOP = 'SHOP',
}
