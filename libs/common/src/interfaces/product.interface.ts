/* eslint-disable no-unused-vars */
export interface IAttributeValue {
  value_id: number;
  original_value_name: string;
  value_unit: string | null;
}
export interface IAttributes {
  attribute_id: string;
  attribute_value_list: IAttributeValue[];
}
export interface Images {
  image_url_list: string[];
  image_id_list: string[];
}
export interface IDimension {
  package_length: number;
  pakage_width: number;
  package_height: number;
}
export interface IPrice_info {
  original_price: number;
  current_price: number;
}
export enum Option_Type {
  option_one,
  option_two,
}
export interface Variation {
  name: string;
  option_type: Option_Type;
  option_list: OptionList[];
}
export interface OptionList {
  image?: string;
  name_goods_classification: string;
}
export interface seller_stock_info {
  location_id: string;
  stock: number;
}
export interface ModelList {
  tier_index: Array<number>;
  price_info: IPrice_info['original_price'];
  model_sku: string;
  seller_stock: seller_stock_info;
}
