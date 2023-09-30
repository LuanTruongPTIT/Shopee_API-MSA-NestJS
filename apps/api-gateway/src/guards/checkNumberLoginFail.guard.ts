import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { RedisService } from 'libs/redis/src/redis.service';
import { CONSTANTS } from '@libs/common/constants/constants';
@Injectable()
export class checkNumberLoginFail implements CanActivate {
  constructor(private readonly redisService: RedisService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { username } = req.body;
    if (!username) {
      return false;
    }
    const numberLoginFail = (await this.redisService.get(
      `${CONSTANTS.KEYREDIS.USER}:${username}`,
    )) as number;
    return !(numberLoginFail && numberLoginFail >= 5);
  }
}
