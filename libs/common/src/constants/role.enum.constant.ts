/* eslint-disable no-unused-vars */
export enum ENUM_ROLE_TYPE {
  SHOP = 'SHOP',
  BUYER = 'BUYER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
export enum ENUM_POLICY_ACTION {
  MANAGE = 'manage',
  READ = 'read',
  WRITE = 'write',
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
  WRITE,
}
export enum ENUM_POLICY_SUBJECT {
  API_KEY = 'API_KEY',
  SETTING = 'SETTING',
  ROLE = 'ROLE',
  USER = 'USER',
  SHOP = 'SHOP',
  PRODUCT = 'PRODUCT',
}
