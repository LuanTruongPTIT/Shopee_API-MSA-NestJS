import { FindUserByIdResult } from './result/FindUserByIdResult';

export interface UserQuery {
  findUserById: (id: string) => Promise<FindUserByIdResult | null>;
}
