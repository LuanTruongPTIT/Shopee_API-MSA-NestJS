import { OmitType } from '@nestjs/swagger';
import { AddCategoryProductRequestDTO } from './addCategoryProductRequest.dto';
export class GetCategoryResponseDto extends OmitType(
  AddCategoryProductRequestDTO,
  [
    'image',
    'no_license_Seller_enabled',
    'is_product_listing_enabled',
    'description',
  ],
) {}
