import { ApiKeyCreateDto } from '@libs/common/dto/auth/api-key/api-key.create.dto';
import { ApiKeyUpdateDateDto } from '@libs/common/dto/auth/api-key/api-key.update-date.dto';
import { HelperDateService } from '@libs/common/helper/services/helper.date.service';
import { EKafkaMessage, EMicroservice } from '@libs/common/interfaces';
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('X-Api-Key')
@Controller('/api-key')
export class ApiKeyController implements OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_AUTH_SERVICE)
    private readonly clientKafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.clientKafka.subscribeToResponseOf(
      EKafkaMessage.REQUEST_CREATE_API_KEY,
    );
    this.clientKafka.connect();
  }

  @Post('/create')
  async CreateApiKey(@Body() data: ApiKeyCreateDto) {
    console.log(data);
    return firstValueFrom(
      this.clientKafka.send(
        EKafkaMessage.REQUEST_CREATE_API_KEY,
        JSON.stringify(data),
      ),
    );
  }
}
