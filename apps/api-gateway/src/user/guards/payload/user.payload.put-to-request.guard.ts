/* eslint-disable @typescript-eslint/no-explicit-any */
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
import ms from 'ms';
import { AnyBulkWriteOperation } from 'mongodb';
import { UserResponseFindByIdSerialization } from '@libs/common/serializations/user.response.find-by-id.serialization';
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
    console.log('user', user);
    const cacheKey = `${user.user._id}:${CACHE_KEY.USER.INFO}`;

    let data: UserResponseFindByIdSerialization = await this.cacheManager.get(
      cacheKey,
    );

    if (!data) {
      data = await firstValueFrom<UserResponseFindByIdSerialization>(
        this.clientKafkaUser.send(
          EKafkaMessage.REQUEST_USER_BY_ID,
          JSON.stringify(user.user._id),
        ),
      );

      if (data) {
        await this.cacheManager.set(cacheKey, data, ms('30m'));
      }
    }
    user.user.isActive = data.isActive;
    user.user.blocked = data.blocked;
    if (!user.user.role) {
      user.user.role = data.role;
    }

    request.__user = user;
    return true;
  }
}
