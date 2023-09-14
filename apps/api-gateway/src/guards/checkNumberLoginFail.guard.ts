import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { RedisService } from 'libs/redis/src/redis.service';
import { CONSTANTS } from '@libs/common/constants/constants';
@Injectable()
export class checkNumberLoginFail implements CanActivate {
  constructor(private readonly redisService: RedisService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.headers.userid?.split(' ') ?? [];
    if (!userId) {
      return false;
    }
    const numberLoginFail = await this.redisService.get(
      `${CONSTANTS.KEYREDIS.USER}:${userId}`,
    );
    return !(numberLoginFail && parseInt(numberLoginFail) >= 5);
  }
}
