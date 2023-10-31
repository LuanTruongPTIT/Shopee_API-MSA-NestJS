import { ObjectId } from 'typeorm';
import { IFindRoleUseCase } from './i-find-role.usecase';
import { RoleRepository } from '../../database/repositories/role.repository';
import { RoleDoc } from '../../database/entities/roles.entity';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
@Injectable()
export class FindRoleUseCase implements IFindRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}
  async FindOneByName(name: string) {
    return this.roleRepository.findOne<RoleDoc>({ name });
  }

  async FindOneById(id: string): Promise<RoleDoc> {
    const result = await this.roleRepository.findOneById<RoleDoc>(id);
    console.log(result);
    return result;
  }
}
