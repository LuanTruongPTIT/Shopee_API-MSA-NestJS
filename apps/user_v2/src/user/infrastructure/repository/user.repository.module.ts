import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '@libs/common/database_mongoose/constants/database.constant';
import { UserEntity, UserSchema } from '../entity/user.entity';
import { UserRepository } from './user.repository';
@Module({
  providers: [UserRepository],
  exports: [UserRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: UserEntity.name,
          schema: UserSchema,
        },
      ],
      // DATABASE_CONNECTION_NAME,
    ),
  ],
})
export class UserRepositoryModule {}
