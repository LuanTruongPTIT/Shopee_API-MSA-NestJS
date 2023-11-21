/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CACHE_KEY } from '@libs/common/constants/Key.management';
import { AuthRefreshPayloadSerialization } from '@libs/common/serializations/auth/auth.refresh-payload.serialization';

@Injectable()
export class AuthJwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwtRefresh',
) {
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(
        configService.get<string>('auth.prefixAuthorization'),
      ),
      ignoreExpiration: true,
      jsonWebTokenOptions: {
        ignoreNotBefore: false,
        audience: configService.get<string>('auth.audience'),
        issuer: configService.get<string>('auth.issuer'),
        subject: configService.get<string>('auth.subject'),
      },
      secretOrKey: configService.get<string>('auth.refreshToken.secretKey'),
    });
  }

  async validate(data: Record<string, any>) {
    console.log(data);
    const key = `${data.user._id}:${CACHE_KEY.AUTH.REFRESH_TOKEN}`;

    const token = await this.cacheManager.get(key);
    console.log('refreshtoken', token);
    if (token) {
      return data;
    }
    return false;
    // return data;
  }
}
