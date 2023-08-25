import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { EKafkaMessage } from '@libs/common/interfaces/kafka.interface';
import { UserDto } from '../database/entities/users.dto';
import { UserService } from '../services/users.service';
import { ResourceSerialization } from '@libs/infra/serialization/resource.serialization';
@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @UseInterceptors(ResourceSerialization)
  @MessagePattern(EKafkaMessage.REQUEST_CREATE_USER)
  async createUser(data: UserDto): Promise<UserDto> {
    console.log('data-create-user', data);
    const streamId = data._id;
    const result = await this.usersService.createUser(streamId, data);
    console.log('result_backend', result);
    return result;
  }
}
