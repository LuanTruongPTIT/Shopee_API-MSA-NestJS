import { Injectable } from '@nestjs/common';
import { User } from '../models/users.models';
import { UserDto } from '../database/entities/users.dto';
import { TokenDto } from '../database/entities/token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserDto)
    private readonly userRepo: Repository<UserDto>,
  ) {}

  async createUser(streamId: string, userDto: UserDto, tokenEmail: string) {
    const user = new User(streamId);
    user.setData(userDto);
    user.createUser(streamId, tokenEmail);
    return user;
  }

  async existByMobileNumber(phoneNumber: string): Promise<UserDto> {
    return this.userRepo.findOne({
      where: { phone_number: phoneNumber },
      withDeleted: true,
    });
  }

  async existEmail(email: string): Promise<UserDto> {
    return this.userRepo.findOne({ where: { email } });
  }
}
