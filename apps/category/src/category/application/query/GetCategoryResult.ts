import { IQueryResult } from '@nestjs/cqrs';

export class GetCategoryResult implements IQueryResult {
  readonly _id: string;
  readonly name: string;
  readonly parents: string;
  readonly is_primary: boolean;
  readonly category_children: GetCategoryResult[];
}
