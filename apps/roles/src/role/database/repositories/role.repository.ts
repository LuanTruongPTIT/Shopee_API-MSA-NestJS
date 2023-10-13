import { DatabaseMongoUUIDRepositoryAbstract } from '@libs/common/database_mongoose/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { RoleEntity, RoleDoc } from '../entities/roles.entity';
import { Model } from 'mongoose';
import { DatabaseModel } from '@libs/common/database_mongoose/decorators/database.decorator';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RoleRepository extends DatabaseMongoUUIDRepositoryAbstract<
  RoleEntity,
  RoleDoc
> {
  constructor(
    @DatabaseModel(RoleEntity.name)
    private readonly roleModel: Model<RoleEntity>,
  ) {
    super(roleModel);
  }
}
