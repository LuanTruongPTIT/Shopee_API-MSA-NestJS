import { Controller, Inject, Body, ConflictException } from '@nestjs/common';
import { RpcException, MessagePattern } from '@nestjs/microservices';
import { RoleCreateDto } from '../domains/dtos/role.create.dto';
import { EKafkaMessage } from '@libs/common/interfaces/kafka.interface';
import { ICreateRoleUseCase } from '../domains/usecases/i-create-role.usecase';
import { ENUM_ROLE_STATUS_CODE_ERROR } from '../constants/role.enum.error';
import { IResponse } from '@libs/common/response/interfaces/response.interface';
import { EventPattern } from '@nestjs/microservices';
@Controller()
export class RoleController {
  constructor(
    @Inject(ICreateRoleUseCase)
    private readonly createRoleUseCase: ICreateRoleUseCase,
  ) {}

  @MessagePattern(EKafkaMessage.REQUEST_CREATE_ROLE)
  async CreateRole(@Body() data: RoleCreateDto): Promise<IResponse> {
    const { name } = data;
    console.log(name);
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

  @EventPattern(EKafkaMessage.REQUEST_FIND_ROLE_BY_NAME)
  async findRole(@Body() data: string) {
    console.log(data);
    console.log('Async find role by name');
    return 1;
  }
}
