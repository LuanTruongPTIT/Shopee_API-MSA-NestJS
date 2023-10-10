import { Controller, Inject, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RoleCreateDto } from '../domains/dtos/role.create.dto';
import { EKafkaMessage } from '@libs/common/interfaces/kafka.interface';
@Controller()
export class RoleController {
  // constructor() {}
  @MessagePattern(EKafkaMessage.REQUEST_CREATE_ROLE)
  async CreateRole(@Body() data: RoleCreateDto) {}
}
