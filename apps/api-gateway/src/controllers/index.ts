import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { clientModuleOptions } from '../config/kafka';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtAccessStrategy } from '../guards/jwt-access/auth.jwt-access.strategy';
import { PassportModule } from '@nestjs/passport';
import { TokenPayloadCheckExist } from '../guards/authentication.guard';
import { RedisModule } from 'libs/redis/src/redis.module';
@Module({
  imports: [
    ClientsModule.register(clientModuleOptions),
    JwtModule.register({}),
    PassportModule,
    RedisModule,
  ],
  controllers: [UserController],
  providers: [AuthJwtAccessStrategy, TokenPayloadCheckExist],
})
export class ControllerModule {}
