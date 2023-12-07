import { CategoryQueryImplement } from '../query/categoryimplement';
import { CategoryService } from '../services/category.service';

export const CategoryProviders = [
  {
    provide: 'CATEGORY_SERVICE',
    useClass: CategoryService,
  },
  {
    provide: 'CATEGORY_QUERY',
    useClass: CategoryQueryImplement,
  },
];
