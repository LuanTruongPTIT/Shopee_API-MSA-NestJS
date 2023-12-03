export interface IAttributeCategoryService {
  checkCategoryAncestors: (
    category_parent_id: Record<string, any>,
  ) => Promise<boolean>;
}
