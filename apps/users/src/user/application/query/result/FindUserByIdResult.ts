import { IQueryResult } from '@nestjs/cqrs';
export class FindUserByIdResult implements IQueryResult {
  readonly _id: string;
  readonly role: string;
  readonly isActive: boolean;
  readonly blocked: boolean;
}
