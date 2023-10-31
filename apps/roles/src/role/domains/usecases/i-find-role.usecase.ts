import { RoleDoc } from '../../database/entities/roles.entity';
export const IFindRoleUseCase = Symbol.for('IFindRoleUseCase');
export interface IFindRoleUseCase {
  FindOneByName(name: string): Promise<RoleDoc>;
  FindOneById(id: string): Promise<RoleDoc>;
}
