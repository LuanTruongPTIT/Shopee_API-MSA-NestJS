import { ICreateRoleUseCase } from './i-create-role.usecase';
import { RoleRepository } from '../../database/repositories/role.repository';
import { RoleCreateDto } from '../dtos/role.create.dto';
import { RoleDoc, RoleEntity } from '../../database/entities/roles.entity';
import { IDatabaseExistOptions } from '@libs/common/database_mongoose/interfaces/database.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateRoleUseCase implements ICreateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}
  async execute(data: RoleCreateDto): Promise<RoleDoc> {
    const { name, type, permission } = data;
    const create: RoleEntity = new RoleEntity();
    create.name = name;
    create.type = type;
    create.permissions = permission;
    return await this.roleRepository.create<RoleEntity>(create);
  }

  async checkExistName(
    name: string,
    options?: IDatabaseExistOptions,
  ): Promise<boolean> {
    const result = await this.roleRepository.exists(
      { name },
      { ...options, withDeleted: true },
    );
    return result;
  }
}
