import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { EKafkaMessage } from '@libs/common/interfaces/kafka.interface';
import { EMicroservice } from '@libs/common/interfaces/kafka.interface';
import { catchError, firstValueFrom, throwError } from 'rxjs';
@Injectable()
export class AuthJwtAccessStrategy
  extends PassportStrategy(Strategy)
  implements OnModuleInit
{
  constructor(
    private readonly configService: ConfigService,
    @Inject(EMicroservice.GATEWAY_USER_SERVICE)
    private readonly clientKafkaUser: ClientKafka,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET_REFRESH_TOKEN,
    });
  }

  async onModuleInit() {
    this.clientKafkaUser.subscribeToResponseOf(
      EKafkaMessage.REQUEST_USER_BY_ID,
    );
    await this.clientKafkaUser.connect();
  }

  async validate(tokenPayload: any) {
    const result = await firstValueFrom(
      this.clientKafkaUser
        .send(
          EKafkaMessage.REQUEST_USER_BY_ID,
          JSON.stringify(tokenPayload.userId),
        )
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
    console.log(result);
  }
}
