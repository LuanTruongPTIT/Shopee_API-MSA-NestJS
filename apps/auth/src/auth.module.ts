import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from './config';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'apps/api-gateway/src/config';
import { AuthService } from './auth.service';
@Module({
  imports: [
    JwtModule.register(config.JWT),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
