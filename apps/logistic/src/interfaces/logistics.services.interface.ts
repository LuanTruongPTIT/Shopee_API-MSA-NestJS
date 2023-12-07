import { CreateShippingMethodSerialization } from '@libs/common/serializations/logistics/create-shipping-method.serialization';
export const ILogisticServiceInterface = Symbol.for(
  'ILogisticServiceInterface',
);
export interface ILogisticServiceInterface {
  createShippingMethod: (
    data: CreateShippingMethodSerialization,
  ) => Promise<void>;
  mappingWithNameMethodShipping: (name_method_shipping: string) => number;
}
