import { Module } from '@nestjs/common';
import { RoleRepository } from './repositories/role.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleEntity, RoleSchema } from './entities/roles.entity';
import { DATABASE_CONNECTION_NAME } from '@libs/common/database_mongoose/constants/database.constant';
@Module({
  providers: [RoleRepository],
  exports: [RoleRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: RoleEntity.name,
          schema: RoleSchema,
        },
      ],
      // DATABASE_CONNECTION_NAME,
    ),
  ],
})
export class RoleRepositoryModule {}
