/* eslint-disable brace-style */
/* eslint-disable prefer-const */
import { AttributeCategoryRepository } from '../domain/Attribute_Category.repository';
import { AddAttributeCategoryRequestDto_v2 } from '../interface/dto/AddAttributCategory.v2.request.dto';
import { datasource } from '../infrastructure/repository/database/orm.config';
import { Attribute_Value } from '../infrastructure/entity/attribute.value.entity';
import { Attribute } from '../infrastructure/entity/attribute.entity';
import {} from '../infrastructure/entity/category.entity';
import { AddAttributeValueCategoryRequestDto } from '../interface/dto/AddAttributeValueCategory.request.dto';

export class AttributeCategoryRepositoryimpelents
  implements AttributeCategoryRepository
{
  async saveAttributeValue(
    data: AddAttributeValueCategoryRequestDto[],
  ): Promise<void> {
    await datasource.getMongoRepository(Attribute_Value).insertMany(data);
  }

  async saveAttribute(data: AddAttributeCategoryRequestDto_v2): Promise<void> {
    await datasource.getMongoRepository(Attribute).insertMany(data.attributes);
  }
}
