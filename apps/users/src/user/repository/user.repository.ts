import { Injectable } from '@nestjs/common';
import { User } from '../models/users.models';
import { UserDto } from '../database/entities/users.dto';
import { TokenDto } from '../database/entities/token.dto';
@Injectable()
export class UserRepository {
  async createUser(streamId: string, userDto: UserDto, tokenEmail: string) {
    const user = new User(streamId);
    user.setData(userDto);
    user.createUser(streamId, tokenEmail);
    return user;
  }
}
