import { CreateShippingMethodDto } from '@libs/common/dto/logistics/create-shipping-method.dto';

export class CreateShippingMethodSerialization extends CreateShippingMethodDto {
  display_name: string;
  shipping_id: number;
}
