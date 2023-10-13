import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { RoleCreateDto } from '../dtos/role.create.dto';
import { RoleDoc } from '../../database/entities/roles.entity';
import { IDatabaseExistOptions } from '@libs/common/database_mongoose/interfaces/database.interface';
export const ICreateRoleUseCase = Symbol.for('ICreateRoleUseCase');
export interface ICreateRoleUseCase {
  execute(data: RoleCreateDto): Promise<RoleDoc>;
  checkExistName(
    name: string,
    options?: IDatabaseExistOptions,
  ): Promise<boolean>;
}
