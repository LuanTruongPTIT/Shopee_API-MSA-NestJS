import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserDto } from '../database/entities/users.dto';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    @InjectRepository(UserDto)
    private readonly userRepo: Repository<UserDto>,
  ) {}

  async createUser(streamId: string, userDto: UserDto) {
    return await this.commandBus.execute(
      new CreateUserCommand(streamId, userDto),
    );
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
