import { AddAttributeCategoryRequestDto_v2 } from '../interface/dto/AddAttributCategory.v2.request.dto';
import { AddAttributeValueCategoryRequestDto } from '../interface/dto/AddAttributeValueCategory.request.dto';
export interface AttributeCategoryRepository {
  saveAttributeValue: (
    data: AddAttributeValueCategoryRequestDto[],
  ) => Promise<void>;
  saveAttribute: (data: AddAttributeCategoryRequestDto_v2) => Promise<void>;
}
