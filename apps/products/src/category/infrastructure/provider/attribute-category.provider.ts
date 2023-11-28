import { AttributeCategoryService } from '../services/attribute-category.service';

export const AtrtributeCategoryProviders = [
  {
    provide: 'ATTRIBUTE_CATEGORY_SERVICE',
    useClass: AttributeCategoryService,
  },
];
