import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { RoleCreateDto } from '../dtos/role.create.dto';
export const ICreateRoleUseCase = Symbol.for('ICreateRoleUseCase');
export interface ICreateRoleUseCase {
  execute(data: RoleCreateDto): Promise<IResponse>;
  checkExistName(name: string): Promise<boolean>;
}
