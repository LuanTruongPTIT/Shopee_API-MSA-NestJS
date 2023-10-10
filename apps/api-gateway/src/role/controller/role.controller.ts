import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  EMicroservice,
  EKafkaMessage,
} from '@libs/common/interfaces/kafka.interface';
import { ClientKafka } from '@nestjs/microservices';
import { RoleCreateDto } from '@libs/common/dto/roles/role.create.dto';
import { RoleAdminCreateDoc } from '../docs/role.admin.doc';
@ApiTags('Role')
@Controller('/role')
export class RoleController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_ROLE_SERVICE)
    private readonly clientKakfa: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKakfa.subscribeToResponseOf(EKafkaMessage.REQUEST_CREATE_ROLE);
    this.clientKakfa.connect();
  }

  @RoleAdminCreateDoc()
  @Post('/create/role')
  async CreateRole(@Body() data: RoleCreateDto) {
    console.log(data);
  }
}
