import { IQueryResult } from '@nestjs/cqrs';
export class FindUserByIdResult implements IQueryResult {
  readonly id: string;
  readonly role: string;
}
