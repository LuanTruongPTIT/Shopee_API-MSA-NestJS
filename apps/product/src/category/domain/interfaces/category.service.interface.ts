export interface ICategoryService {
  checkCategoryParentExist: (category_name: string) => Promise<boolean>;
}
