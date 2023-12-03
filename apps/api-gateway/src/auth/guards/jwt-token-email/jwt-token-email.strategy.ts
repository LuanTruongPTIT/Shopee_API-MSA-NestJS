/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtTokenEmailStrategy extends PassportStrategy(
  Strategy,
  'jwtTokenEmail',
) {
  constructor(private readonly configService: ConfigService) {
    console.log(ExtractJwt.fromBodyField('token'));
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      ignoreExpiration: true,
      jsonWebTokenOptions: {
        ignoreNotBefore: false,
        audience: configService.get<string>('auth.audience'),
        issuer: configService.get<string>('auth.issuer'),
        subject: configService.get<string>('auth.subject'),
      },
      secretOrKey: configService.get<string>(
        'auth.tokenEmail.tokenEmailSecretKey',
      ),
    });
  }

  async validate(data: any) {
    return data;
  }
}
