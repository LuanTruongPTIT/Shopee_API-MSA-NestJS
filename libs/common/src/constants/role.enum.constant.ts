/* eslint-disable no-unused-vars */
export enum ENUM_ROLE_TYPE {
  SELLER = 'seller',
  BUYER = 'buyer',
  SUPER_ADMIN = 'shop manager',
  CUSTOMER_SUPPORT_STAFF = 'custom support staff',
  SUPPLIER = 'supplier',
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
