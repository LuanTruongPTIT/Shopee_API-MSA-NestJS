import { CategoryService } from '../services/category.service';

export const CategoryProviders = [
  {
    provide: 'CATEGORY_SERVICE',
    useClass: CategoryService,
  },
];
