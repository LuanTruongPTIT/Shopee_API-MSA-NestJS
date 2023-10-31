import { UserQuery } from '../../application/query/UserQuery';
import { datasource } from '../repository/database/orm.config';
import { FindUserByIdResult } from '../../application/query/result/FindUserByIdResult';
import { UserEntity } from '../../infrastructure/entity/user.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserQueryImplement implements UserQuery {
  async findUserById(id: string): Promise<FindUserByIdResult | null> {
    const result = await datasource
      .getMongoRepository(UserEntity)
      .findOneOrFail({
        where: { _id: id },
        select: ['_id', 'role'],
      });
    console.log(id, result);
    return {
      id: result._id,
      role: result.role,
    };
  }
}
