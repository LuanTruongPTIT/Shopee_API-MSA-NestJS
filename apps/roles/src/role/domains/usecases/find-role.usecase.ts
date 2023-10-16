import { IFindRoleUseCase } from './i-find-role.usecase';
import { RoleRepository } from '../../database/repositories/role.repository';
import { RoleDoc } from '../../database/entities/roles.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class FindRoleUseCase implements IFindRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}
  async FindOneByName(name: string) {
    return this.roleRepository.findOne<RoleDoc>({ name });
  }
}
