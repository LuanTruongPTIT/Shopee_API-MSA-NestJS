import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
// import googleConfig from '@libs/common/configs/google.config';
import { Injectable } from '@nestjs/common';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly clientId: string;
  private readonly clientSecret: string;
  constructor(private readonly configService: ConfigService) {
    super({
      clientID:
        '590372866083-5lto6kktt737ievjh9193feo4a7784hc.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8444/api/v1/auth/login/google/',
      scope: ['profile', 'email'],
    });
    // this.clientId = this.configService.get<string>('google.clientId');
    // this.clientSecret = this.configService.get<string>('google. clientSecret');
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      email: 'emilamiruu1',
    };
  }
}
