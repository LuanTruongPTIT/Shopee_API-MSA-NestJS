import { Injectable } from '@nestjs/common';
import { User } from '../models/users.models';
import { UserDto } from '../database/entities/users.dto';
@Injectable()
export class UserRepository {
  async createUser(streamId: string, userDto: UserDto) {
    const user = new User(streamId);
    console.log('UserRepository');
    user.setData(userDto);
    await user.createUser(streamId);
    return user;
  }
}
