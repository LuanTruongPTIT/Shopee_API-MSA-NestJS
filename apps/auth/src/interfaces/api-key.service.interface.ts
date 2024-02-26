import { IDatabaseCreateOptions } from '@libs/common/database_mongoose/interfaces/database.interface';
import { ApiKeyCreateDto } from '@libs/common/dto/auth/api-key/api-key.create.dto';
import { ApiKeyDoc } from '../database/entites/api-key.entites';

export const IApiKeyService = Symbol.for('IApiKeyService');
export interface IApiKeyService {
  createKey: () => Promise<string>;
  createSecret: () => Promise<string>;
  create: (
    { name, type, startDate, endDate }: ApiKeyCreateDto,
    options?: IDatabaseCreateOptions,
  ) => Promise<IApiKeyCreated>;
  createHashApiKey: (key: string, secret: string) => Promise<string>;
}
export interface IApiKeyCreated {
  secret: string;
  doc: ApiKeyDoc;
}
