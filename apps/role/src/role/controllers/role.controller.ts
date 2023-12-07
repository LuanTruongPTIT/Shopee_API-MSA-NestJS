import { Controller, Inject, Body, ConflictException } from '@nestjs/common';
import {
  RpcException,
  MessagePattern,
  Payload,
  EventPattern,
} from '@nestjs/microservices';
import { RoleCreateDto } from '../domains/dtos/role.create.dto';
import { EKafkaMessage } from '@libs/common/interfaces/kafka.interface';
import { ICreateRoleUseCase } from '../domains/usecases/i-create-role.usecase';
import { ENUM_ROLE_STATUS_CODE_ERROR } from '../constants/role.enum.error';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { IFindRoleUseCase } from '../domains/usecases/i-find-role.usecase';
import { RoleDoc } from '../database/entities/roles.entity';

@Controller()
export class RoleController {
  constructor(
    @Inject(ICreateRoleUseCase)
    private readonly createRoleUseCase: ICreateRoleUseCase,
    @Inject(IFindRoleUseCase)
    private readonly findRoleUseCase: IFindRoleUseCase,
  ) {}

  @MessagePattern(EKafkaMessage.REQUEST_CREATE_ROLE)
  async CreateRole(@Body() data: RoleCreateDto): Promise<IResponse> {
    const { name } = data;

    const result: boolean = await this.createRoleUseCase.checkExistName(name);

    if (result) {
      throw new RpcException(
        new ConflictException({
          statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_EXIST_ERROR,
          message: 'role.error.exist',
        }),
      );
    }
    const create = await this.createRoleUseCase.execute(data);
    return {
      data: create._id,
    };
  }

  @MessagePattern('REQUEST_FIND_ROLE_BY_NAME')
  async findRole(@Payload() data: string) {
    const result = await this.findRoleUseCase.FindOneByName(JSON.parse(data));
    return result._id;
  }

  @MessagePattern(EKafkaMessage.REQUEST_FIND_ROLE_BY_ID)
  async findRoleByID(@Body() data: string): Promise<any> {
    const result = await this.findRoleUseCase.FindOneById(JSON.parse(data));

    return JSON.stringify(result);
  }
}
