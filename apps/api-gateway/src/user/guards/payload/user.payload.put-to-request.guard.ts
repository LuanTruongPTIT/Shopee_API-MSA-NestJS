import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IRequestApp } from '@libs/common/request/interfaces/request.interface';
import {
  EKafkaMessage,
  EMicroservice,
} from '@libs/common/interfaces/kafka.interface';
import { CACHE_KEY } from '@libs/common/constants/Key.management';

@Injectable()
export class UserPayloadPutToRequestGuard implements CanActivate, OnModuleInit {
  constructor(
    @Inject(EMicroservice.GATEWAY_USER_SERVICE)
    private readonly clientKafkaUser: ClientKafka,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async onModuleInit() {
    this.clientKafkaUser.subscribeToResponseOf(
      EKafkaMessage.REQUEST_USER_BY_ID,
    );
    await this.clientKafkaUser.connect();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<IRequestApp & { __user: any }>();
    const { user } = request;
    const cacheKey = `${user}:${CACHE_KEY.USER.INFO}`;

    let data = await this.cacheManager.get(cacheKey);

    if (!data) {
      data = await firstValueFrom(
        this.clientKafkaUser.send(
          EKafkaMessage.REQUEST_USER_BY_ID,
          JSON.stringify(user),
        ),
      );

      if (data) {
        await this.cacheManager.set(cacheKey, data);
      }
    }

    return !!data;
  }
}
