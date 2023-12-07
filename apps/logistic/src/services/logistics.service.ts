import { CreateShippingMethodSerialization } from '@libs/common/serializations/logistics/create-shipping-method.serialization';
import { ILogisticServiceInterface } from '../interfaces/logistics.services.interface';
import { ShippingMethodEntity } from '../database/entites/shipping.entites';
import { ShippingMethodRepository } from '../database/repositories/logicstics.repository';
import { Injectable } from '@nestjs/common';
import {
  ENUM_SHIPPING_ID,
  NAME_SHIPPING_METHOD,
} from '@libs/common/constants/logistics.enum';

@Injectable()
export class LogisticsService implements ILogisticServiceInterface {
  constructor(private readonly logisticsRepo: ShippingMethodRepository) {}
  mappingWithNameMethodShipping(name_method_shipping: string): number {
    switch (name_method_shipping) {
      case NAME_SHIPPING_METHOD.NHANH:
        return ENUM_SHIPPING_ID.NHANH;
      case NAME_SHIPPING_METHOD.GIAO_HANG_NHANH:
        return ENUM_SHIPPING_ID.GIAO_HANG_NHANH;
      case NAME_SHIPPING_METHOD.AhaMove:
        return ENUM_SHIPPING_ID.AhaMove;
      case NAME_SHIPPING_METHOD.HOA_TOC:
        return ENUM_SHIPPING_ID.HOA_TOC;
      case NAME_SHIPPING_METHOD.NINJA_VAN:
        return ENUM_SHIPPING_ID.NINJA_VAN;
      case NAME_SHIPPING_METHOD.SPX_EXPRESS:
        return ENUM_SHIPPING_ID.SPX_EXPRESS;
      case NAME_SHIPPING_METHOD.TIET_KIEM:
        return ENUM_SHIPPING_ID.TIET_KIEM;
      case NAME_SHIPPING_METHOD.VIETTEL_POST:
        return ENUM_SHIPPING_ID.VIETTEL_POST;
      case NAME_SHIPPING_METHOD.VNPOST_TIET_KIEM:
        return ENUM_SHIPPING_ID.VNPOST_TIET_KIEM;
      default:
        return null;
    }
  }

  async createShippingMethod(
    data: CreateShippingMethodSerialization,
  ): Promise<void> {
    const shippingMethodEntities = new ShippingMethodEntity();
    shippingMethodEntities.shipping_id = data.shipping_id;
    shippingMethodEntities.name = data.name;
    shippingMethodEntities.display_name = data.display_name;
    shippingMethodEntities.is_shipping_method_enabled =
      data.is_shipping_method_enabled;
    shippingMethodEntities.item_max_weight = data.item_max_weight;
    shippingMethodEntities.item_min_weight = data.item_min_weight;
    shippingMethodEntities.item_max_dimension = data.item_max_dimension;
    shippingMethodEntities.is_free_shipping_shop_channel =
      data.is_free_shipping_shop_channel;
    shippingMethodEntities.is_displayed = data.is_displayed;
    shippingMethodEntities.block_reason = data.block_reason;
    shippingMethodEntities.parent_id = data.parent_id;
    shippingMethodEntities.parent_id_list = data.parent_id_list;
    // console.log()
    await this.logisticsRepo.create(shippingMethodEntities);
  }
}
