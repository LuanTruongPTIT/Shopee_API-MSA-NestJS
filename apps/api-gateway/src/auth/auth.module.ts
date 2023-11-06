import { Module } from '@nestjs/common';
import { JwtTokenEmailStrategy } from './guards/jwt-token-email/jwt-token-email.strategy';
import { AuthController } from './controller/auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from './config/kafka';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtAccessStrategy } from './guards/jwt-access/auth.jwt-access.strategy';
import { CheckTokenPayload } from './guards/auth.check-token-redis.guard';

@Module({
  imports: [
    ClientsModule.register(clientModuleOptions),
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [JwtTokenEmailStrategy, AuthJwtAccessStrategy, CheckTokenPayload],
  exports: [JwtTokenEmailStrategy, AuthJwtAccessStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
