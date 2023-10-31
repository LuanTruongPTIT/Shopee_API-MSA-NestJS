import { Module } from '@nestjs/common';
import { JwtTokenEmailStrategy } from './jwt-token-email/jwt-token-email.strategy';
@Module({
  providers: [JwtTokenEmailStrategy],
  exports: [JwtTokenEmailStrategy],
})
export class AuthModule {}
