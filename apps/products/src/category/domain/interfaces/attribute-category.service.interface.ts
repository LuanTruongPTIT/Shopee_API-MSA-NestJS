export interface IAttributeCategoryService {
  checkCategoryAncestors: (
    field: string,
    category_parent_id: Array<string>,
  ) => Promise<boolean>;
}
