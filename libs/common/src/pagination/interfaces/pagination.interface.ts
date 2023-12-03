import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from '../constants/pagination.enum.constant';

export interface IPaginationPaging {
  limit: number;
  offset: number;
}

export interface IPaginationOptions {
  paging?: IPaginationPaging;
  order?: IPaginationOrder;
}

export type IPaginationOrder = Record<
  string,
  ENUM_PAGINATION_ORDER_DIRECTION_TYPE
>;
