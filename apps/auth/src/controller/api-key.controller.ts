import { ApiKeyCreateDto } from '@libs/common/dto/auth/api-key/api-key.create.dto';
import { EKafkaMessage } from '@libs/common/interfaces';
import { Body, Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IApiKeyService } from '../interfaces/api-key.service.interface';
import { IResponse } from '@libs/common/response/interfaces/response.interface';

@Controller()
export class ApiKeyController {
  constructor(
    @Inject(IApiKeyService)
    private readonly apiKeySerivce: IApiKeyService,
  ) {}

  @MessagePattern(EKafkaMessage.REQUEST_CREATE_API_KEY)
  async CreateApiKey(@Body() data: ApiKeyCreateDto): Promise<IResponse> {
    const created = await this.apiKeySerivce.create(data);
    return {
      data: {
        _id: created.doc._id,
        secret: created.secret,
      },
    };
  }
}
