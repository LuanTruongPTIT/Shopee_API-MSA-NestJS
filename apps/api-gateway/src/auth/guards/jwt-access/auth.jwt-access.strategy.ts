/* eslint-disable @typescript-eslint/no-explicit-any */
import { CACHE_KEY } from '@libs/common/constants/Key.management';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';
import { Request as RequestType } from 'express';

@Injectable()
export class AuthJwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        AuthJwtAccessStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: true,
      jsonWebTokenOptions: {
        ignoreNotBefore: false,
        audience: configService.get<string>('auth.audience'),
        issuer: configService.get<string>('auth.issuer'),
        subject: configService.get<string>('auth.subject'),
      },
      secretOrKey: configService.get<string>('auth.accessToken.secretKey'),
    });
  }

  private static extractJWT(req: RequestType): string | null {
    if (
      req.cookies &&
      'csrf_token' in req.cookies &&
      req.cookies.csrf_token.length > 0
    ) {
      return req.cookies.csrf_token;
    }
    return null;
  }

  async validate(data: Record<string, any>) {
    console.log('data', data);
    const key = `${data.user._id}:${CACHE_KEY.AUTH.ACCESS_TOKEN}`;
    const accesstoken = await this.cacheManager.get(key);
    if (accesstoken) {
      return data;
    }
    return false;
  }
}
